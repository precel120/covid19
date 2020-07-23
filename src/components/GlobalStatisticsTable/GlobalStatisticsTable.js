import React from 'react';
import PropTypes from 'prop-types';

const GlobalStatisticsTable = (props) => {
  const { globalData } = props;
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = globalData;
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
};

GlobalStatisticsTable.propTypes = {
  globalData: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default GlobalStatisticsTable;
