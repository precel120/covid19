import React from 'react';
import PropTypes from 'prop-types';

const CountriesList = (props) => {
  const { countries } = props;
  return (
    <ul>
      {countries.map(country => {
        return <li>{country.Country}</li>;
      })}
    </ul>
  );
};

CountriesList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CountriesList;
