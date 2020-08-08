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
  const handleClick = useCallback(() => {
    onClick(country, index);
    getDataForChart(country);
  }, [index, onClick, getDataForChart, country]);
  return (
    <>
      <ListItem button onClick={handleClick} selected={selectedIndex === index}>
        <ListItemText
          primary={
            <Typography style={{ fontWeight: '600' }}>{country}</Typography>
          }
        />
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
  selectedIndex: PropTypes.number,
  countryCode: PropTypes.string.isRequired,
};

CountriesListItem.defaultProps = {
  selectedIndex: null,
};

export default CountriesListItem;
