import React from 'react';
import PropTypes from 'prop-types';
import CountriesListElement from './CountriesListElement/CountriesListElement';

const CountriesList = ({ countries, openModalFn }) => (
  <ul>
    {countries.map(({ Country, CountryCode }) => (
      <CountriesListElement
        keyCode={CountryCode}
        country={Country}
        openModalFn={openModalFn}
      />
    ))}
  </ul>
);

CountriesList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModalFn: PropTypes.func.isRequired,
};

export default CountriesList;
