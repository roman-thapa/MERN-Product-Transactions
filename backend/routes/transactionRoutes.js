const express = require('express');
const { initializeDatabase, listTransactions } = require('../controllers/transactionController');

const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/transactions', listTransactions);

module.exports = router;
