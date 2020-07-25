import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const Chart = ({ dataset }) => {
  const [chartData, setChartData] = useState({});
  const dates = [];
  const confirmed = [];
  const deaths = [];
  const recovered = [];
  const extractData = () => {
    dataset.map((item) => {
      dates.push(item.Date);
      confirmed.push(item.Confirmed);
      deaths.push(item.Deaths);
      recovered.push(item.Recovered);
    });
  };
  const createChart = () => {
    extractData();
    setChartData({
      labels: [...dates],
      datasets: [
        {
          label: 'Confirmed',
          data: [...confirmed],
          backgroundColor: ['rgba(75,192,192,0.6)'],
          borderWitdh: 4,
        },
        {
          label: 'Recovered',
          data: [...recovered],
          backgroundColor: ['rgba(75,150,150,1)'],
          borderWitdh: 4,
        },
        {
          label: 'Deaths',
          data: [...deaths],
          backgroundColor: ['rgba(192,150,120,1)'],
          borderWitdh: 4,
        },
      ],
    });
  };
  // chce create chart w dependency array (React Hook useEffect has a missing dependency: 'createChart'. Either include it or remove the dependency array)
  useEffect(() => {
    createChart();
  }, [dataset]);
  return <Line data={chartData} />;
};

Chart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chart;
