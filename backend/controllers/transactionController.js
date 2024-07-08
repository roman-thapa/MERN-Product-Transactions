const axios = require("axios");
const Transaction = require("../models/Transaction");

const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;
    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);
    res.status(200).send("Database initialized successfully");
  } catch (error) {
    res.status(500).send("Error initializing database");
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
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { price: { $regex: search, $options: "i" } },
    ];
  }
  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage);
  res.status(200).json(transactions);
};

const getStatistics = async (req, res) => {
  const { month } = req.query;
  const query = {};
  if (month) {
    const start = new Date(`${month} 1, 2023`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    query.dateOfSale = { $gte: start, $lt: end };
  }
  const totalSaleAmount = await Transaction.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: "$price" } } },
  ]);
  const soldItemsCount = await Transaction.countDocuments({
    ...query,
    sold: true,
  });
  const notSoldItemsCount = await Transaction.countDocuments({
    ...query,
    sold: false,
  });
  res.status(200).json({
    totalSaleAmount: totalSaleAmount[0]?.total || 0,
    soldItemsCount,
    notSoldItemsCount,
  });
};

const getBarChart = async (req, res) => {
  const { month } = req.query;
  const query = {};
  if (month) {
    const start = new Date(`${month} 1, 2023`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    query.dateOfSale = { $gte: start, $lt: end };
  }
  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  const barChartData = await Promise.all(
    priceRanges.map(async ({ range, min, max }) => {
      const count = await Transaction.countDocuments({
        ...query,
        price: { $gte: min, $lt: max === Infinity ? undefined : max },
      });
      return { range, count };
    })
  );
  res.status(200).json(barChartData);
};

const getPieChart = async (req, res) => {
  const { month } = req.query;
  const query = {};
  if (month) {
    const start = new Date(`${month} 1, 2023`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    query.dateOfSale = { $gte: start, $lt: end };
  }
  const pieChartData = await Transaction.aggregate([
    { $match: query },
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $project: { category: "$_id", count: 1, _id: 0 } },
  ]);
  res.status(200).json(pieChartData);
};

const getCombinedData = async (req, res) => {
  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      listTransactions(req, res),
      getStatistics(req, res),
      getBarChart(req, res),
      getPieChart(req, res),
    ]);
    res.status(200).json({ transactions, statistics, barChart, pieChart });
  } catch (error) {
    res.status(500).send("Error fetching combined data");
  }
};

module.exports = {
  initializeDatabase,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
};
