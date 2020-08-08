import React, { useContext } from 'react';
import { Grid, Container } from '@material-ui/core';
import GlobalStatisticsElement from './GlobalStatisticsElement/GlobalStatisticsElement';
import AppContext from '../../context';

const GlobalStatistics = () => {
  const { globalStats } = useContext(AppContext);
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = globalStats;
  const stringWithCommas = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : undefined;
  };
  return (
    <Container style={{ margin: '10px 0 10px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <GlobalStatisticsElement
            title="Total Confirmed"
            color="#3e95cd"
            value={stringWithCommas(TotalConfirmed)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <GlobalStatisticsElement
            title="Total Deaths"
            value={stringWithCommas(TotalDeaths)}
            color="#c45850"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <GlobalStatisticsElement
            title="Total Recovered"
            value={stringWithCommas(TotalRecovered)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default GlobalStatistics;
