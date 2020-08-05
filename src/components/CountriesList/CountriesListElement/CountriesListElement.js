import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import AppContext from '../../../context';
import Chart from '../../Chart/Chart';
import styles from './CountriesListElement.module.scss';

const CountriesListElement = ({ keyCode, country }) => {
  const [isClicked, setIsClicked] = useState(false);
  const toggleChart = (getDataForChart) => {
    if (isClicked) setIsClicked(false);
    else {
      getDataForChart(country);
      setIsClicked(true);
    }
  };
  return (
    <AppContext.Consumer>
      {({ getDataForChart, dataset }) => (
        <li className={styles.wrapper} key={keyCode}>
          <Button onClickFn={() => toggleChart(getDataForChart)}>
            {country}
          </Button>
          {isClicked ? (
            <div>
              <Chart dataset={dataset} />
            </div>
          ) : null}
        </li>
      )}
    </AppContext.Consumer>
  );
};

CountriesListElement.propTypes = {
  keyCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default CountriesListElement;
