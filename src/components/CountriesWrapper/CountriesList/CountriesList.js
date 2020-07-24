import React from 'react';
import PropTypes from 'prop-types';

const CountriesList = (props) => {
  const { countries } = props;
  return (
    <ul>
      {countries.map(({ Country, CountryCode }) => {
        return <li key={CountryCode}>{Country}</li>;
      })}
    </ul>
  );
};

CountriesList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CountriesList;
