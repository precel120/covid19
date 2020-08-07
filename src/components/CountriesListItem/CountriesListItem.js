import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';

const CountriesListItem = ({
  onClick,
  getDataForChart,
  country,
  index,
  selectedIndex,
}) => {
  const handleClick = useCallback(
    (event) => {
      onClick(event, country, index);
      getDataForChart(country);
    },
    [index, onClick, getDataForChart, country]
  );
  return (
    <>
      <ListItem button onClick={handleClick} selected={selectedIndex === index}>
        <ListItemText primary={country} style={{ textAlign: 'center' }} />
      </ListItem>
    </>
  );
};

CountriesListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
  getDataForChart: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

export default CountriesListItem;
