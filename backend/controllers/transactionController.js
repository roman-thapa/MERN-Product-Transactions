const axios = require('axios');
const Transaction = require('../models/Transaction');

const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;
    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);
    res.status(200).send('Database initialized successfully');
  } catch (error) {
    res.status(500).send('Error initializing database');
  }
};

const listTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  const query = {};
  if (month) {
    const start = new Date(`${month} 1, 2023`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    query.dateOfSale = { $gte: start, $lt: end };
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { price: { $regex: search, $options: 'i' } },
    ];
  }
  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage);
  res.status(200).json(transactions);
};

module.exports = {
  initializeDatabase,
  listTransactions,
};