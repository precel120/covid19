import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import GlobalStatisticsElement from './GlobalStatisticsElement/GlobalStatisticsElement';
import AppContext from '../../context';

const GlobalStatistics = () => {
  const { globalStats } = useContext(AppContext);
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = globalStats;
  return (
    <Grid container spacing={1}>
      <Grid item xs={4} sm={4}>
        <GlobalStatisticsElement
          title="Total Confirmed"
          color="#3e95cd"
          value={TotalConfirmed}
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <GlobalStatisticsElement
          title="Total Deaths"
          value={TotalDeaths}
          color="#c45850"
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <GlobalStatisticsElement
          title="Total Recovered"
          value={TotalRecovered}
        />
      </Grid>
    </Grid>
  );
};

export default GlobalStatistics;
