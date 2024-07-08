import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchPieData = async () => {
      const response = await axios.get(`/api/piechart`, { params: { month } });
      setPieData(response.data);
    };
    fetchPieData();
  }, [month]);

  const data = {
    labels: pieData.map(item => item.category),
    datasets: [
      {
        label: 'Number of Items',
        data: pieData.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
