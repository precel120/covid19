import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import AppContext from '../../../context';

const CountriesListElement = ({ keyCode, country }) => (
  <AppContext.Consumer>
    {({ openModal }) => (
      <li key={keyCode}>
        <Button buttonType="button" onClickFn={() => openModal(country)}>
          {country}
        </Button>
      </li>
    )}
  </AppContext.Consumer>

);

CountriesListElement.propTypes = {
  keyCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default CountriesListElement;
