import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const interests = [
  { name: 'Creative', score: 80 },
  { name: 'Business', score: 60 },
  { name: 'Office', score: 50 },
  { name: 'Practical', score: 70 },
  { name: 'Scientific', score: 30 },
  { name: 'Outdoor', score: 40 },
  { name: 'People Contact', score: 20 }
];

const InterestChart = () => {
  const data = {
    labels: interests.map(interest => interest.name),
    datasets: [
      {
        label: 'Interest Scores',
        data: interests.map(interest => interest.score),
        backgroundColor: interests.map(interest => {
          const alpha = interest.score / 100;
          return `rgba(54, 162, 235, ${alpha})`;
        }),
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 100
      },
      y: {
        ticks: {
          callback: function(value) {
            return this.getLabelForValue(value).split(' ').join('\n');
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    }
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default InterestChart;
