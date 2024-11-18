import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationPyramid = () => {
  // Dữ liệu dân số
  const data = {
    labels: ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'],
    datasets: [
      {
        label: 'Nam',
        data: [-5, -6, -7, -8, -9, -10, -12, -12, -10, -9, -8, -7, -5, -4, -3, -2, -1], // Dữ liệu âm cho biểu đồ bên trái
        backgroundColor: 'blue',
      },
      {
        label: 'Nữ',
        data: [5, 6, 7, 8, 9, 10, 12, 12, 10, 9, 8, 7, 5, 4, 3, 2, 1], // Dữ liệu dương cho biểu đồ bên phải
        backgroundColor: 'purple',
      },
    ],
  };

  // Tùy chọn biểu đồ
  const options = {
    indexAxis: 'y' as const, // Biểu đồ ngang
    scales: {
      x: {
        ticks: {
          callback: (value) => Math.abs(value), // Hiển thị giá trị dương
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${tooltipItem.dataset.label}: ${Math.abs(value)}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center' }}>Tháp dân số (%)</h3>
      <Bar data={data} options={options} />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
        <span style={{ color: 'blue' }}>NAM</span>
        <span style={{ color: 'purple' }}>NỮ</span>
      </div>
    </div>
  );
};

export default PopulationPyramid;
