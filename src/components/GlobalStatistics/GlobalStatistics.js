import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import GlobalStatisticsElement from './GlobalStatisticsElement/GlobalStatisticsElement';
import AppContext from '../../context';

const GlobalStatistics = () => {
  const { globalStats } = useContext(AppContext);
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = globalStats;
  return (
    <Grid container spacing={2}>
      <GlobalStatisticsElement title="Total Confirmed" value={TotalConfirmed} />
      <GlobalStatisticsElement
        title="Total Deaths"
        value={TotalDeaths}
        color="#c45850"
      />
      <GlobalStatisticsElement
        title="Total Recovered"
        value={TotalRecovered}
        color="#3e95cd"
      />
    </Grid>
  );
};

export default GlobalStatistics;
