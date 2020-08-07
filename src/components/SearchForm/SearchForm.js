import React, { useState, useContext, useCallback } from 'react';
import { Button, Input } from '@material-ui/core';
import AppContext from '../../context';
import styles from './SearchForm.module.scss';

const SearchForm = () => {
  const [countryName, setCountryName] = useState('');
  const [wasSearched, setWasSearched] = useState(false);
  const { findCountry, resetSearch } = useContext(AppContext);
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      findCountry(countryName);
      if (!wasSearched) setWasSearched(true);
    },
    [findCountry, countryName, wasSearched, setWasSearched]
  );
  const handleReset = useCallback(
    (e) => {
      e.preventDefault();
      resetSearch();
      if (wasSearched) setWasSearched(false);
    },
    [resetSearch, wasSearched, setWasSearched]
  );
  const handleInput = useCallback(
    (e) => {
      e.preventDefault();
      setCountryName(e.target.value);
    },
    [setCountryName]
  );
  return (
    <div className={styles.wrapper}>
      <form autoComplete="off" onSubmit={handleSearch}>
        <Input
          name="countryToFind"
          value={countryName}
          onChange={handleInput}
          onPaste={handleInput}
        />
        <Button variant="contained" type="submit">
          Search
        </Button>
        <Button
          variant="contained"
          type="button"
          onClick={handleReset}
          disabled={!wasSearched}
        >
          Reset
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
