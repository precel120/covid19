import React, { useState } from 'react';
import Button from '../Button/Button';
import AppContext from '../../context';

const SearchForm = () => {
  const [countryName, setCountryName] = useState('');
  return (
    <AppContext.Consumer>
      {({ findCountry, resetSearch }) => (
        <div className="searchform-wrapper">
          <form
            autoComplete="off"
            onSubmit={(e) => findCountry(e, countryName)}
          >
            <input
              type="text"
              name="countryToFind"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              onPaste={(e) => setCountryName(e.target.value)}
            />
            <Button buttonType="submit">Search</Button>
          </form>
          <Button onClickFn={resetSearch}>Reset</Button>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default SearchForm;