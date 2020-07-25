import React from 'react';
import PropTypes from 'prop-types';
import CountriesList from './CountriesList/CountriesList';

const CountriesWrapper = ({ countries, openModalFn }) => (
  <div className="countries-wrapper">
    <CountriesList countries={countries} openModalFn={openModalFn} />
  </div>
);

CountriesWrapper.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModalFn: PropTypes.func.isRequired,
};

export default CountriesWrapper;
