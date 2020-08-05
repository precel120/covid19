import React, { useMemo, useContext, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import AppContext from '../../context';

const Chart = () => {
  const { dataset } = useContext(AppContext);
  const dates = [];
  const confirmed = [];
  const deaths = [];
  const recovered = [];
  const extractData = useCallback(() => {
    dataset.forEach((item) => {
      dates.push(item.Date);
      confirmed.push(item.Confirmed);
      deaths.push(item.Deaths);
      recovered.push(item.Recovered);
    });
  }, [recovered, confirmed, dates, deaths, dataset]);
  const createChart = useCallback(() => {
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
  }, [dates, recovered, deaths, confirmed, extractData]);
  const chartData = useMemo(() => createChart(), [createChart]);
  return <Line data={chartData} />;
};

export default Chart;
