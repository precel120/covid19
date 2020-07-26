import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalStatisticsTable from './components/GlobalStatisticsTable/GlobalStatisticsTable';
import CountriesList from './components/CountriesList/CountriesList';
import Modal from './components/Modal/Modal';
import SearchForm from './components/SearchForm/SearchForm';
import AppContext from './context';

// TODO global state for ex CountriesListElement
const App = () => {
  const [globalStats, setGlobalStats] = useState({});
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const openModal = (openedCountry) => {
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
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <AppContext.Provider
      value={{
        globalStats,
        findCountry,
        resetSearch,
        countriesToDisplay,
        openModal,
        closeModal,
      }}
    >
      <div className="wrapper">
        <h1>COVID19 statistics for day {currentDate.toDateString()}</h1>
        <GlobalStatisticsTable />
        <SearchForm />
        {wasFound ? (
          <CountriesList countries={countriesToDisplay} />
        ) : (
          <div>Cannot find country</div>
        )}
        {isModalOpen ? <Modal dataset={dataset} /> : null}
      </div>
    </AppContext.Provider>
  );
};

export default App;
