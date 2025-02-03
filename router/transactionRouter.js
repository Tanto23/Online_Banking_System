
const transactionRouter = require("express").Router();
const { transferFunds, getTransactions } = require('../controller/transactionController'); // Corrected import path


transactionRouter.post('/transfer', transferFunds);
transactionRouter.get('/transactions/:userId', getTransactions);

module.exports = transactionRouter;