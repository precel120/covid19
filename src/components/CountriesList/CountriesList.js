import React from 'react';
import PropTypes from 'prop-types';
import CountriesListElement from './CountriesListElement/CountriesListElement';

const CountriesList = ({ countries }) => (
  <ul>
    {countries.map(({ Country, CountryCode }) => (
      <CountriesListElement keyCode={CountryCode} country={Country} />
    ))}
  </ul>
);

CountriesList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CountriesList;
