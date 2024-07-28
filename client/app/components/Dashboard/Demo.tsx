import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Employee Count',
      data: [10, 20, 30, 40, 50, 60, 70],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Employee Performance',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
    },
  ],
};

const doughnutData = {
  labels: ['HR', 'Engineering', 'Sales', 'Marketing'],
  datasets: [
    {
      label: 'Department Distribution',
      data: [300, 50, 100, 80],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">HR Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 border rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Employee Count</h2>
          <Bar data={barData} />
        </div>
        <div className="p-5 border rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Employee Performance</h2>
          <Line data={lineData} />
        </div>
        <div className="p-5 border rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Department Distribution</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
