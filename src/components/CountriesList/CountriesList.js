import React from 'react';
import PropTypes from 'prop-types';
import CountriesListElement from './CountriesListElement/CountriesListElement';
import styles from './CountriesList.module.scss';

const CountriesList = ({ countries }) => (
  <ul className={styles.wrapper}>
    {countries.map(({ Country, CountryCode }) => (
      <CountriesListElement keyCode={CountryCode} country={Country} />
    ))}
  </ul>
);

CountriesList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CountriesList;
