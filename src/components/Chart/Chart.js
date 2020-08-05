import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const Chart = ({ dataset }) => {
  const dates = [];
  const confirmed = [];
  const deaths = [];
  const recovered = [];
  const extractData = () => {
    dataset.forEach((item) => {
      dates.push(item.Date);
      confirmed.push(item.Confirmed);
      deaths.push(item.Deaths);
      recovered.push(item.Recovered);
    });
  };
  const createChart = () => {
    extractData();
    return {
      labels: [...dates],
      datasets: [
        {
          label: 'Recovered',
          data: [...recovered],
          borderColor: '#3cba9f',
          borderWitdh: 4,
          fill: false,
        },
        {
          label: 'Deaths',
          data: [...deaths],
          borderColor: '#c45850',
          borderWitdh: 4,
          fill: false,
        },
        {
          label: 'Confirmed',
          data: [...confirmed],
          borderColor: '#3e95cd',
          borderWitdh: 4,
          fill: false,
        },
      ],
      options: {
        responsive: true,
      },
    };
  };
  const chartData = useMemo(() => createChart(), [createChart]);
  return <Line data={chartData} />;
};

Chart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chart;
