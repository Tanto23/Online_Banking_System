const { Users } = require('../models'); // Updated to use the correct model name
const { v4: uuidv4 } = require('uuid'); // Import UUID


// Create a New User
exports.createUser = async (req, res) => {
    const { name, email, balance } = req.body;

    // Validate balance to ensure it is a valid number
    if (isNaN(balance) || balance < 0) {
        return res.status(400).json({ error: "Balance must be a valid non-negative number" });
    }

    if (!name || !email || balance === undefined) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const result = await Users.create({ 
            id: uuidv4(), // Generate UUID for user ID
            name, 
            email, 
            balance 
        });


        res.status(201).json({ message: "User created successfully", userId: result.id });

    } catch (error) {
        res.status(500).json({ error: error.message || "User creation failed" });
    }
};

// Get User Details
exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Users.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.findAll();
        res.status(200).json(allUsers);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
