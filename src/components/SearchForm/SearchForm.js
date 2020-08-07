import React, { useState, useContext, useCallback } from 'react';
import { OutlinedInput, IconButton } from '@material-ui/core';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
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
        <OutlinedInput
          name="countryToFind"
          placeholder="Search"
          id="outlined-adornment-amount"
          value={countryName}
          onChange={handleInput}
          onPaste={handleInput}
        />
        <IconButton type="submit">
          <SearchSharpIcon />
        </IconButton>
        <IconButton type="button" onClick={handleReset} disabled={!wasSearched}>
          <ClearSharpIcon />
        </IconButton>
      </form>
    </div>
  );
};

export default SearchForm;
