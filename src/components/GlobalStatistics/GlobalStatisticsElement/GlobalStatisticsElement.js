import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const GlobalStatisticsElement = ({ title, value, color }) => (
  <Card
    style={{
      backgroundColor: color,
      color: 'white',
      margin: '10px 15px',
      height: '100%',
    }}
  >
    <CardContent>
      <Typography variant="h6" component="h2" gutterBottom>
        {title} <br /> Globally
      </Typography>
      <Typography variant="h4" component="h3">
        {value}
      </Typography>
    </CardContent>
  </Card>
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
