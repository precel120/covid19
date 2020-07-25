import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalStatisticsTable from './components/GlobalStatisticsTable/GlobalStatisticsTable';
import CountriesWrapper from './components/CountriesWrapper/CountriesWrapper';
import Modal from './components/Modal/Modal';
import SearchForm from './components/SearchForm/SearchForm';

// TODO global state for ex CountriesListElement
const App = () => {
  const [global, setGlobal] = useState({});
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
        setGlobal({ ...Global });
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
    <div className="wrapper">
      <h1>COVID19 statistics for day {currentDate.toDateString()}</h1>
      <GlobalStatisticsTable globalData={global} />
      <SearchForm findCountryFn={findCountry} resetSearchFn={resetSearch} />
      {wasFound ? (
        <CountriesWrapper
          countries={countriesToDisplay}
          openModalFn={openModal}
        />
      ) : (
        <div>Cannot find country</div>
      )}
      {isModalOpen ? (
        <Modal closeModalFn={closeModal} dataset={dataset} />
      ) : null}
    </div>
  );
};

export default App;
