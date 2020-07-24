import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalStatisticsTable from './components/GlobalStatisticsTable/GlobalStatisticsTable';
import CountriesWrapper from './components/CountriesWrapper/CountriesWrapper';

const App = () => {
  const [global, setGlobal] = useState({});
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);
  const currentDate = new Date();

  useEffect(() => {
    axios.get('https://api.covid19api.com/summary').then(res => {
      if (res.status === 200) {
        const { Global, Countries } = res.data;
        setGlobal({ ...Global });
        setCountries([...Countries]);
        setCountriesToDisplay([...Countries]);
      }
    });
  }, []);
  const findCountry = (e, countryToFind) => {
    e.preventDefault();
    const foundCountry = countries.find(
      (country) => country.Country === countryToFind
    );
    setCountriesToDisplay([foundCountry]);
  };
  const resetSearch = (e) => {
    e.preventDefault();
    setCountriesToDisplay([...countries]);
  };
  return (
    <>
      <h1>COVID19 statistics for day {currentDate.toDateString()}</h1>
      <GlobalStatisticsTable globalData={global} />
      <CountriesWrapper
        countries={countriesToDisplay}
        findCountryFn={findCountry}
        resetFn={resetSearch}
      />
    </>
  );
};

export default App;
