import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchBarData = async () => {
      const response = await axios.get(`/api/barchart`, { params: { month } });
      setBarData(response.data);
    };
    fetchBarData();
  }, [month]);

  const data = {
    labels: barData.map(item => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: barData.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
