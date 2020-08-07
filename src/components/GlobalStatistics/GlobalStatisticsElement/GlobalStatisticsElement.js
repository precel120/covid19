import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const GlobalStatisticsElement = ({ title, value, color }) => (
  <Grid item style={{ marginTop: '20px' }}>
    <Card style={{ backgroundColor: color, color: 'white' }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title} <br /> Globally
        </Typography>
        <Typography component="p">{value}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

GlobalStatisticsElement.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

GlobalStatisticsElement.defaultProps = {
  color: '#3cba9f',
};

export default GlobalStatisticsElement;
