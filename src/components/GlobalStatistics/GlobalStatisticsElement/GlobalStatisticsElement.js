import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import PublicSharpIcon from '@material-ui/icons/PublicSharp';
import PropTypes from 'prop-types';

const GlobalStatisticsElement = ({ title, value, color }) => (
  <Card
    style={{
      backgroundColor: color,
      color: 'white',
      margin: '10px 40px',
      height: '100%',
    }}
  >
    <CardContent style={{ padding: '15px 5px 10px 15px' }}>
      <Typography
        variant="subtitle1"
        component="h3"
        style={{ fontWeight: '600' }}
      >
        {title}
      </Typography>
      <PublicSharpIcon fontSize="large" />
      <Typography
        variant="h4"
        component="h3"
        style={{ overflowWrap: 'break-word' }}
      >
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
