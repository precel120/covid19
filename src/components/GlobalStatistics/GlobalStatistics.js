import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import GlobalStatisticsElement from './GlobalStatisticsElement/GlobalStatisticsElement';
import AppContext from '../../context';

const GlobalStatistics = () => {
  const { globalStats } = useContext(AppContext);
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = globalStats;
  return (
    <Grid container spacing={4}>
      <GlobalStatisticsElement
        title="Total Confirmed"
        color="#3e95cd"
        value={TotalConfirmed}
      />
      <GlobalStatisticsElement
        title="Total Deaths"
        value={TotalDeaths}
        color="#c45850"
      />
      <GlobalStatisticsElement title="Total Recovered" value={TotalRecovered} />
    </Grid>
  );
};

export default GlobalStatistics;
