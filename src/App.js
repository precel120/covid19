import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  List,
  ListSubheader,
  Grid,
  Container,
  Typography,
  Box,
} from '@material-ui/core';
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
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

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
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
    window.addEventListener('resize', handleResize);
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
      const foundCountries = countries.filter((country) =>
        country.Country.includes(countryToFind)
      );
      if (foundCountries) {
        setCountriesToDisplay([...foundCountries]);
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
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h4"
              component="h1"
              style={{ margin: '30px 0 0 30px', fontWeight: '700' }}
            >
              COVID-<span>19</span> statistics for {currentDate.toDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <GlobalStatistics />
          </Grid>
          {dimensions.width <= 600 && (
            <Grid item xs={12}>
              <Container style={{ paddingLeft: '0' }} maxWidth="xl">
                <Chart />
              </Container>
            </Grid>
          )}
          <Grid item xs={12} sm={3}>
            <Box width="90%">
              <SearchForm />
            </Box>
            <List
              subheader={
                <ListSubheader style={{ textAlign: 'center' }}>
                  Countries
                </ListSubheader>
              }
              style={{
                overflowX: 'hidden',
                overflowY: 'scroll',
                height: '70vh',
              }}
            >
              {wasFound &&
                countriesToDisplay.map(({ Country, CountryCode }, index) => (
                  <CountriesListItem
                    key={CountryCode}
                    getDataForChart={getDataForChart}
                    country={Country}
                    countryCode={CountryCode}
                    showChart={currentlyShowedChart === Country}
                    onClick={handleChart}
                    index={index}
                    selectedIndex={selectedIndex}
                  />
                ))}
            </List>
          </Grid>
          {dimensions.width > 600 && (
            <Grid item sm={9}>
              <Container style={{ paddingLeft: '0' }} maxWidth="xl">
                <Chart />
              </Container>
            </Grid>
          )}
        </Grid>
      </div>
    </AppContext.Provider>
  );
};

export default App;
