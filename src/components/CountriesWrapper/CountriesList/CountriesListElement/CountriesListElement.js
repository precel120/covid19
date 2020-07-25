import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../Button/Button';

const CountriesListElement = ({ keyCode, country, openModalFn }) => (
  <li key={keyCode}>
    <Button buttonType="button" onClickFn={() => openModalFn(country)}>
      {country}
    </Button>
  </li>
);

CountriesListElement.propTypes = {
  keyCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  openModalFn: PropTypes.func.isRequired,
};

export default CountriesListElement;
