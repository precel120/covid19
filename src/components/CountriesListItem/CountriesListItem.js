import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Avatar,
} from '@material-ui/core';

const CountriesListItem = ({
  onClick,
  getDataForChart,
  country,
  index,
  selectedIndex,
  countryCode,
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
        <ListItemText primary={<Typography>{country}</Typography>} />
        <ListItemAvatar>
          <Avatar
            src={`https://www.countryflags.io/${countryCode}/flat/64.png`}
          />
        </ListItemAvatar>
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
  countryCode: PropTypes.string.isRequired,
};

export default CountriesListItem;
