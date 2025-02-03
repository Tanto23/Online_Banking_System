const express = require('express');
const PORT = 5454; // Changed port number to avoid conflict
const transactionRouter = require("./router/transactionRouter");
const usersRouter = require("./router/usersRouter"); // Corrected import


const app = express();
app.use(express.json());


app.use( transactionRouter); // Corrected usage
app.use( usersRouter); // Corrected usage

app.listen(PORT, () => {
    console.log("My app is running on port " + PORT);
});
