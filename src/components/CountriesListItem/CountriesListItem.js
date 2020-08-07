import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';

const CountriesListItem = ({ onClick, getDataForChart, country }) => {
  const handleClick = useCallback(() => {
    onClick(country);
    getDataForChart(country);
  }, [onClick, getDataForChart, country]);
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={country} style={{ textAlign: 'center' }} />
      </ListItem>
    </>
  );
};

CountriesListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
  getDataForChart: PropTypes.func.isRequired,
};

export default CountriesListItem;
