import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import AppContext from '../../../context';
import Chart from '../../Chart/Chart';
import styles from './CountriesListElement.module.scss';

const CountriesListElement = ({ keyCode, country }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { getDataForChart } = useContext(AppContext);
  const toggleChart = useCallback(() => {
    if (isClicked) setIsClicked(false);
    else {
      getDataForChart(country);
      setIsClicked(true);
    }
  }, [isClicked, setIsClicked, getDataForChart, country]);
  return (
    <li className={styles.wrapper} key={keyCode}>
      <Button onClick={toggleChart}>{country}</Button>
      {isClicked && (
        <div>
          <Chart />
        </div>
      )}
    </li>
  );
};

CountriesListElement.propTypes = {
  keyCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default CountriesListElement;
