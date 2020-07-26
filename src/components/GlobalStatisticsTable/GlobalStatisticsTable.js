import React from 'react';
import AppContext from '../../context';

const GlobalStatisticsTable = () => {
  return (
    <AppContext.Consumer>
      {({ globalStats }) => {
        const { TotalConfirmed, TotalDeaths, TotalRecovered } = globalStats;
        return (
          <table>
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
      }}
    </AppContext.Consumer>
  );
};

export default GlobalStatisticsTable;
