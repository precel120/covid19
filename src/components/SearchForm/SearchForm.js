import React, { useState } from 'react';
import Button from '../Button/Button';
import AppContext from '../../context';
import styles from './SearchForm.module.scss';

// TODO: FIX Po wyszukaniu, kliknieciu i resecie zostaje chart dla pierwszego
const SearchForm = () => {
  const [countryName, setCountryName] = useState('');
  const [wasSearched, setWasSearched] = useState(false);
  const handleSearch = (e, findCountry) => {
    e.preventDefault();
    findCountry(countryName);
    if (!wasSearched) setWasSearched(true);
  };
  const handleReset = (e, resetSearch) => {
    e.preventDefault();
    resetSearch();
    if (wasSearched) setWasSearched(false);
  };
  const handleInput = (e) => {
    e.preventDefault();
    setCountryName(e.target.value);
  };
  return (
    <AppContext.Consumer>
      {({ findCountry, resetSearch }) => (
        <div className={styles.wrapper}>
          <form
            autoComplete="off"
            onSubmit={(e) => handleSearch(e, findCountry)}
          >
            <input
              className={styles.searchField}
              type="text"
              name="countryToFind"
              value={countryName}
              onChange={handleInput}
              onPaste={handleInput}
            />
            <Button buttonType="submit">Search</Button>
          </form>
          {wasSearched ? (
            <Button onClick={(e) => handleReset(e, resetSearch)}>Reset</Button>
          ) : null}
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default SearchForm;
