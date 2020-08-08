import React, { useState, useContext, useCallback } from 'react';
import { OutlinedInput, IconButton, InputAdornment } from '@material-ui/core';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import AppContext from '../../context';

const SearchInput = () => {
  const [countryName, setCountryName] = useState('');
  const { findCountry, resetSearch } = useContext(AppContext);
  const handleReset = useCallback(
    (e) => {
      e.preventDefault();
      resetSearch();
      setCountryName('');
    },
    [resetSearch, setCountryName]
  );
  const handleInput = useCallback(
    (e) => {
      e.preventDefault();
      setCountryName(e.target.value);
      findCountry(countryName);
    },
    [findCountry, setCountryName, countryName]
  );
  return (
    <OutlinedInput
      name="countryToFind"
      autoComplete="off"
      fullWidth
      placeholder="Search"
      value={countryName}
      onChange={handleInput}
      style={{ margin: '0 0 20px 15px' }}
      endAdornment={
        countryName !== '' ? (
          <InputAdornment>
            <IconButton type="button" onClick={handleReset}>
              <ClearSharpIcon />
            </IconButton>
          </InputAdornment>
        ) : null
      }
    />
  );
};

export default SearchInput;
