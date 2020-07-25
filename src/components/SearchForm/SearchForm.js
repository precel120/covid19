import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const SearchForm = ({ findCountryFn, resetSearchFn }) => {
  const [countryName, setCountryName] = useState('');
  return (
    <div className="searchform-wrapper">
      <form autoComplete="off" onSubmit={(e) => findCountryFn(e, countryName)}>
        <input
          type="text"
          name="countryToFind"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          onPaste={(e) => setCountryName(e.target.value)}
        />
        <Button buttonType="submit">Search</Button>
      </form>
      <Button buttonType="button" onClickFn={resetSearchFn}>
        Reset
      </Button>
    </div>
  );
};

SearchForm.propTypes = {
  findCountryFn: PropTypes.func.isRequired,
  resetSearchFn: PropTypes.func.isRequired,
};

export default SearchForm;