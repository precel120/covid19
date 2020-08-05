import React, { useContext } from 'react';
import AppContext from '../../context';
import styles from './GlobalStatisticsTable.module.scss';

const GlobalStatisticsTable = () => {
  const { globalStats } = useContext(AppContext);
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = globalStats;
  return (
    <table className={styles.wrapper}>
      <thead>
        <tr>
          <th>Total Confirmed</th>
          <th>Total Deaths</th>
          <th>Total Recovered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{TotalConfirmed}</td>
          <td>{TotalDeaths}</td>
          <td>{TotalRecovered}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default GlobalStatisticsTable;
