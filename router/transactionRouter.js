const express = require('express');
const { transferFunds, getTransactions } = require('../controller/transactionController'); // Corrected import path

const router = express.Router();

router.post('/transfer', transferFunds);
router.get('/transactions/:userId', getTransactions);

module.exports = router;