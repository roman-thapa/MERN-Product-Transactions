import { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    soldItemsCount: 0,
    notSoldItemsCount: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get(`/api/statistics`, { params: { month } });
      setStats(response.data);
    };
    fetchStatistics();
  }, [month]);

  return (
    <div>
      <div>Total Sale Amount: {stats.totalSaleAmount}</div>
      <div>Total Sold Items: {stats.soldItemsCount}</div>
      <div>Total Not Sold Items: {stats.notSoldItemsCount}</div>
    </div>
  );
};

export default Statistics;