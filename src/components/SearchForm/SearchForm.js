import React, { useState, useContext } from 'react';
import Button from '../Button/Button';
import AppContext from '../../context';
import styles from './SearchForm.module.scss';

// TODO: FIX Po wyszukaniu, kliknieciu i resecie zostaje chart dla pierwszego
const SearchForm = () => {
  const [countryName, setCountryName] = useState('');
  const [wasSearched, setWasSearched] = useState(false);
  const { findCountry, resetSearch } = useContext(AppContext);
  const handleSearch = (e) => {
    e.preventDefault();
    findCountry(countryName);
    if (!wasSearched) setWasSearched(true);
  };
  const handleReset = (e) => {
    e.preventDefault();
    resetSearch();
    if (wasSearched) setWasSearched(false);
  };
  const handleInput = (e) => {
    e.preventDefault();
    setCountryName(e.target.value);
  };
  return (
    <div className={styles.wrapper}>
      <form autoComplete="off" onSubmit={handleSearch}>
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
      {wasSearched ? <Button onClick={handleReset}>Reset</Button> : null}
    </div>
  );
};

export default SearchForm;
