import React, { useState } from 'react';
import Button from '../Button/Button';
import AppContext from '../../context';
import styles from './SearchForm.module.scss';

const SearchForm = () => {
  const [countryName, setCountryName] = useState('');
  const [wasSearched, setWasSearched] = useState(false);
  const find = (e, findCountry) => {
    findCountry(e, countryName);
    if (!wasSearched) setWasSearched(true);
  };
  const reset = (e, resetSearch) => {
    resetSearch(e);
    if (wasSearched) setWasSearched(false);
  };
  return (
    <AppContext.Consumer>
      {({ findCountry, resetSearch }) => (
        <div className={styles.wrapper}>
          <form autoComplete="off" onSubmit={(e) => find(e, findCountry)}>
            <input
              className={styles.searchField}
              type="text"
              name="countryToFind"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              onPaste={(e) => setCountryName(e.target.value)}
            />
            <Button buttonType="submit">Search</Button>
          </form>
          {wasSearched ? (
            <Button onClickFn={(e) => reset(e, resetSearch)}>Reset</Button>
          ) : null}
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default SearchForm;