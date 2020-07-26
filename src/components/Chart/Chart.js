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
    dataset.forEach((item) => {
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
