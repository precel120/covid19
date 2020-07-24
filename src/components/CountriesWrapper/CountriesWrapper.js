import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CountriesList from './CountriesList/CountriesList';

const CountriesWrapper = (props) => {
  const [countryName, setCountryName] = useState('');
  const { countries, resetFn } = props;
  return (
    <>
      <form
        autoComplete="off"
        onSubmit={(e) => props.findCountryFn(e, countryName)}
      >
        <input
          type="text"
          name="countryToFind"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          onPaste={(e) => setCountryName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button type="button" onClick={resetFn}>
        Reset
      </button>
      <CountriesList countries={countries} />
    </>
  );
};

CountriesWrapper.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  findCountryFn: PropTypes.func.isRequired,
  resetFn: PropTypes.func.isRequired,
};

export default CountriesWrapper;
