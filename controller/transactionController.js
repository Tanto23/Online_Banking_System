const db = require('../database'); 
const { v4: uuidv4 } = require('uuid'); // Import UUID

// Transfer funds between users
const transferFunds = async (req, res) => {
    const connection = await db.getConnection(); 
    if (!connection) {
        return res.status(500).json({ error: "Failed to connect to the database." });
    }
    
    // Log the input values
    console.log("Received input:", req.body);

    try {
        await connection.beginTransaction(); 

        const { senderId, receiverId, amount } = req.body;

        // Input validation
        if (!senderId || !receiverId || amount <= 0 || isNaN(amount)) {
            await connection.rollback();
            return res.status(400).json({ error: "Invalid input: Check sender, receiver, and amount." });
        }

        // Fetch sender's balance
        const [sender] = await connection.execute(
            "SELECT balance FROM users WHERE id = ? FOR UPDATE",
            [senderId] // Corrected to pass as an array
        );

        if (sender.length === 0) {
            await connection.rollback();
            return res.status(404).json({ error: "Sender not found." });
        }

        if (sender[0].balance < amount) {
            await connection.rollback();
            return res.status(400).json({ error: "Insufficient balance." });
        }

        // Deduct amount from sender
        await connection.execute(
            "UPDATE users SET balance = balance - ? WHERE id = ?",
            [amount, senderId] // Corrected to pass as an array
        );

        // Add amount to receiver
        await connection.execute(
            "UPDATE users SET balance = balance + ? WHERE id = ?",
            [amount, receiverId]
        );

        // Generate a UUID for the transaction
        const transactionId = uuidv4();

        // Record the transaction with UUID, including createdAt and updatedAt
        const currentTime = new Date();
        await connection.execute(
            "INSERT INTO transactions (id, senderId, receiverId, amount, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", // Updated to include timestamps
            [transactionId, senderId, receiverId, amount, currentTime, currentTime]
        );

        await connection.commit(); // Commit transaction
        return res.status(200).json({ message: "Transaction successful." });

    } catch (error) {
        await connection.rollback(); // Rollback in case of error
        console.error("Transaction Error:", error);
        return res.status(500).json({ error: "Transaction failed. Please check the connection." });
    } finally {
        connection.release(); // Release connection
    }
};

// Get user transaction history
const getTransactions = async (req, res) => {
    const connection = await db.getConnection(); // Ensure proper connection handling
    if (!connection) {
        return res.status(500).json({ error: "Failed to connect to the database." });
    }

    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        const [transactions] = await connection.execute(
            "SELECT * FROM transactions WHERE senderId = ? OR receiverId = ? ORDER BY createdAt DESC", // Updated column names
            [userId, userId]
        );

        return res.status(200).json({ transactions });
    } catch (error) {
        console.error("Transaction History Error:", error);
        return res.status(500).json({ error: "Could not retrieve transactions. Please check the connection." });
    } finally {
        connection.release(); 
    }
};

module.exports = { transferFunds, getTransactions };
