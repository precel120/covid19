import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { List, ListSubheader, Grid, Container } from '@material-ui/core';
import GlobalStatistics from './components/GlobalStatistics/GlobalStatistics';
import CountriesListItem from './components/CountriesListItem/CountriesListItem';
import SearchForm from './components/SearchForm/SearchForm';
import AppContext from './context';
import Chart from './components/Chart/Chart';

const App = () => {
  const [globalStats, setGlobalStats] = useState({});
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);
  const [wasFound, setWasFound] = useState(true);
  const [dataset, setDataset] = useState([]);
  const [currentlyShowedChart, setCurrentlyShowedChart] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentDate = new Date();

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
    // getDataForChart("Afghanistan");
    // setCurrentlyShowedChart(countries[0].Country);
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
        // getDataForChart(countryToFind);
        // setCurrentlyShowedChart(countryToFind);
      } else {
        setWasFound(false);
      }
    },
    [countries, setCountriesToDisplay, wasFound, setWasFound]
  );
  const resetSearch = useCallback(() => {
    setCountriesToDisplay([...countries]);
    // getDataForChart(countries[0].Country);
    // setCurrentlyShowedChart(countries[0].Country);
    if (!wasFound) setWasFound(true);
  }, [countries, setCountriesToDisplay, wasFound, setWasFound]);
  const handleChart = useCallback((event, Country, index) => {
    setCurrentlyShowedChart(Country);
    setSelectedIndex(index);
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
          <Grid item xs={3}>
            <h1>
              COVID-<span>19</span> statistics for day{' '}
              {currentDate.toDateString()}
            </h1>
          </Grid>
          <Grid item xs={9}>
            <Container>
              <GlobalStatistics />
            </Container>
          </Grid>
          <Grid item xs={3}>
            <Container>
              <SearchForm />
            </Container>
            <List
              subheader={
                <ListSubheader component="div">Countries</ListSubheader>
              }
              style={{
                overflowX: 'hidden',
                overflowY: 'scroll',
                height: '70vh',
              }}
            >
              {wasFound ? (
                countriesToDisplay.map(({ Country, CountryCode }, index) => (
                  <CountriesListItem
                    key={CountryCode}
                    getDataForChart={getDataForChart}
                    country={Country}
                    showChart={currentlyShowedChart === Country}
                    onClick={handleChart}
                    index={index}
                    selectedIndex={selectedIndex}
                  />
                ))
              ) : (
                <h2>Cannot find country</h2>
              )}
            </List>
          </Grid>
          <Grid item xs={9}>
            <Container maxWidth="false" style={{ paddingLeft: '0' }}>
              <Chart />
            </Container>
          </Grid>
        </Grid>
      </div>
    </AppContext.Provider>
  );
};

export default App;
