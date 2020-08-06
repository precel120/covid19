import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Chart from '../Chart/Chart';
import styles from './CountriesListItem.module.scss';

const CountriesListItem = ({
  onClick,
  showChart,
  getDataForChart,
  keyCode,
  country,
}) => {
  const handleClick = useCallback(() => {
    onClick(country, showChart);
    getDataForChart(country);
  }, [onClick, showChart, getDataForChart, country]);
  return (
    <li className={styles.wrapper} key={keyCode}>
      <Button onClick={handleClick}>{country}</Button>
      <div>{showChart && <Chart />}</div>
    </li>
  );
};

CountriesListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  showChart: PropTypes.bool,
  keyCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  getDataForChart: PropTypes.func.isRequired,
};

CountriesListItem.defaultProps = {
  showChart: false,
}

export default CountriesListItem;
