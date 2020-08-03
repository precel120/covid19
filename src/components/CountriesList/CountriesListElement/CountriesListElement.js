import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import AppContext from '../../../context';
import styles from './CountriesListElement.module.scss';

const CountriesListElement = ({ keyCode, country }) => (
  <AppContext.Consumer>
    {({ openModal }) => (
      <li className={styles.wrapper} key={keyCode}>
        <Button onClickFn={() => openModal(country)}>{country}</Button>
      </li>
    )}
  </AppContext.Consumer>
);

CountriesListElement.propTypes = {
  keyCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default CountriesListElement;
