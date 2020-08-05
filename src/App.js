import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalStatisticsTable from './components/GlobalStatisticsTable/GlobalStatisticsTable';
import CountriesList from './components/CountriesList/CountriesList';
import SearchForm from './components/SearchForm/SearchForm';
import AppContext from './context';

const App = () => {
  const [globalStats, setGlobalStats] = useState({});
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);
  const [wasFound, setWasFound] = useState(true);
  const [dataset, setDataset] = useState([]);
  const currentDate = new Date();

  useEffect(() => {
    axios.get('https://api.covid19api.com/summary').then(({ status, data }) => {
      if (status === 200) {
        const { Global, Countries } = data;
        setGlobalStats({ ...Global });
        setCountries([...Countries]);
        setCountriesToDisplay([...Countries]);
      }
    });
  }, []);
  const findCountry = (e, countryToFind) => {
    e.preventDefault();
    const foundCountry = countries.find(
      (country) => country.Country.toLowerCase() === countryToFind.toLowerCase()
    );
    if (foundCountry) {
      setCountriesToDisplay([foundCountry]);
      if (!wasFound) setWasFound(true);
    } else {
      setWasFound(false);
    }
  };
  const resetSearch = (e) => {
    e.preventDefault();
    setCountriesToDisplay([...countries]);
    if (!wasFound) setWasFound(true);
  };
  const getDataForChart = (openedCountry) => {
    const displayedCountry = countriesToDisplay.find(
      (country) => country.Country === openedCountry
    );
    axios
      .get(
        `https://api.covid19api.com/live/country/${displayedCountry.Slug}/status/confirmed`
      )
      .then(({ status, data }) => {
        if (status === 200) {
          setDataset([...data]);
        }
      });
  };
  return (
    <AppContext.Provider
      value={{
        globalStats,
        findCountry,
        resetSearch,
        countriesToDisplay,
        getDataForChart,
        dataset,
      }}
    >
      <div>
        <h1>
          <span>COVID19</span> statistics for day {currentDate.toDateString()}
        </h1>
        <GlobalStatisticsTable />
        <SearchForm />
        {wasFound ? (
          <CountriesList countries={countriesToDisplay} />
        ) : (
          <div>
            <h2>Cannot find country</h2>
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
