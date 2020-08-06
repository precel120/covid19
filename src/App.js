import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { List, ListSubheader, Container, Grid, Box } from '@material-ui/core';
import GlobalStatisticsTable from './components/GlobalStatisticsTable/GlobalStatisticsTable';
import CountriesListItem from './components/CountriesListItem/CountriesListItem';
import SearchForm from './components/SearchForm/SearchForm';
import AppContext from './context';

const App = () => {
  const [globalStats, setGlobalStats] = useState({});
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);
  const [wasFound, setWasFound] = useState(true);
  const [dataset, setDataset] = useState([]);
  const [currentlyShowedChart, setCurrentlyShowedChart] = useState('');
  const currentDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://api.covid19api.com/summary');
      const { status, data } = response;
      if (status === 200) {
        const { Global, Countries } = data;
        setGlobalStats({ ...Global });
        setCountries([...Countries]);
        setCountriesToDisplay([...Countries]);
      }
    };
    fetchData();
  }, []);
  const findCountry = useCallback(
    (countryToFind) => {
      const foundCountry = countries.find(
        (country) =>
          country.Country.toLowerCase() === countryToFind.toLowerCase()
      );
      if (foundCountry) {
        setCountriesToDisplay([foundCountry]);
        if (!wasFound) setWasFound(true);
      } else {
        setWasFound(false);
      }
      setCurrentlyShowedChart('');
    },
    [countries, setCountriesToDisplay, wasFound, setWasFound]
  );
  const resetSearch = useCallback(() => {
    setCountriesToDisplay([...countries]);
    setCurrentlyShowedChart('');
    if (!wasFound) setWasFound(true);
  }, [countries, setCountriesToDisplay, wasFound, setWasFound]);
  const getDataForChart = useCallback(
    async (openedCountry) => {
      const displayedCountry = countriesToDisplay.find(
        (country) => country.Country === openedCountry
      );
      const response = await axios.get(
        `https://api.covid19api.com/live/country/${displayedCountry.Slug}/status/confirmed`
      );
      const { status, data } = response;
      if (status === 200) setDataset([...data]);
    },
    [countriesToDisplay, setDataset]
  );
  const toggleChart = useCallback((Country, showChart) => {
    if (showChart) setCurrentlyShowedChart('');
    else setCurrentlyShowedChart(Country);
  }, []);
  return (
    <AppContext.Provider
      value={{
        globalStats,
        findCountry,
        resetSearch,
        countriesToDisplay,
        dataset,
      }}
    >
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>
              COVID-<span>19</span> statistics for day{' '}
              {currentDate.toDateString()}
            </h1>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="sm">
              <GlobalStatisticsTable />
            </Container>
          </Grid>
          <Grid item xs={12}>
            <SearchForm />
          </Grid>
          <Grid item xs={12}>
            <List
              subheader={
                <ListSubheader component="div" style={{ textAlign: 'center' }}>
                  Countries
                </ListSubheader>
              }
            >
              {wasFound ? (
                countriesToDisplay.map(({ Country, CountryCode }) => (
                  <CountriesListItem
                    key={CountryCode}
                    getDataForChart={getDataForChart}
                    country={Country}
                    showChart={currentlyShowedChart === Country}
                    onClick={toggleChart}
                  />
                ))
              ) : (
                <h2>Cannot find country</h2>
              )}
            </List>
          </Grid>
        </Grid>
      </div>
    </AppContext.Provider>
  );
};

export default App;
