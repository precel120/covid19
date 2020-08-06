import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ListItem, List, Collapse, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Chart from '../Chart/Chart';

const CountriesListItem = ({
  onClick,
  showChart,
  getDataForChart,
  country,
}) => {
  const handleClick = useCallback(() => {
    onClick(country, showChart);
    getDataForChart(country);
  }, [onClick, showChart, getDataForChart, country]);
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={country} style={{ textAlign: 'center' }} />
        {showChart ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={showChart} timeout="auto" unmountOnExit>
        <List>
          <ListItem>
            <Chart />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

CountriesListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  showChart: PropTypes.bool,
  country: PropTypes.string.isRequired,
  getDataForChart: PropTypes.func.isRequired,
};

CountriesListItem.defaultProps = {
  showChart: false,
};

export default CountriesListItem;
