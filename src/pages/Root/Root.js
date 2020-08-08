import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  List,
  ListSubheader,
  Grid,
  Container,
  Typography,
  Box,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
import GlobalStatistics from '../../components/GlobalStatistics/GlobalStatistics';
import CountriesListItem from '../../components/CountriesListItem/CountriesListItem';
import AppContext from '../../context';
import Chart from '../../components/Chart/Chart';

const Root = () => {
  const [globalStats, setGlobalStats] = useState({});
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [currentlyShowedChart, setCurrentlyShowedChart] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const currentDate = new Date();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
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
  }, []);

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

  const findCountry = useCallback(
    (e) => {
      setSearchInputValue(e.target.value);
      const foundCountries = countries.filter((country) =>
        country.Country.toLowerCase().includes(searchInputValue.toLowerCase())
      );
      if (foundCountries) {
        setCountriesToDisplay([...foundCountries]);
        setSelectedIndex(null);
      }
    },
    [
      searchInputValue,
      setSearchInputValue,
      countries,
      setSelectedIndex,
      setCountriesToDisplay,
    ]
  );

  const resetSearch = useCallback(() => {
    setCountriesToDisplay([...countries]);
    setSearchInputValue('');
    setSelectedIndex(null);
  }, [countries, setSelectedIndex, setCountriesToDisplay]);

  const handleChart = useCallback(
    (Country, index) => {
      setCurrentlyShowedChart(Country);
      setSelectedIndex(index);
    },
    [setCurrentlyShowedChart, setSelectedIndex]
  );

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
          <Grid item xs={9} md={2} style={{ padding: '0' }}>
            <Typography
              variant="h3"
              component="h1"
              style={{ margin: '25px 0 0 25px', fontWeight: '700' }}
            >
              COVID-<span>19</span>
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
              style={{ marginLeft: '25px', fontWeight: '600' }}
            >
              {currentDate.toDateString()}
            </Typography>
          </Grid>
          <Grid item xs={3} md={1} style={{ padding: '0' }}>
            <FontAwesomeIcon
              icon={faVirus}
              size="5x"
              style={{ margin: '30px 5px 30px 0' }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <GlobalStatistics />
          </Grid>
          {dimensions.width <= 1000 && (
            <Grid item xs={12}>
              <Container style={{ paddingLeft: '0' }} maxWidth="xl">
                <Chart />
              </Container>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={3}>
            <Box width="90%">
              <OutlinedInput
                name="countryToFind"
                autoComplete="off"
                fullWidth
                placeholder="Search"
                onChange={findCountry}
                style={{ margin: '0 0 20px 15px' }}
                endAdornment={
                  searchInputValue !== '' ? (
                    <InputAdornment>
                      <IconButton type="button" onClick={resetSearch}>
                        <ClearSharpIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
              />
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
              {countriesToDisplay.map(({ Country, CountryCode }, index) => (
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
          {dimensions.width > 1000 && (
            <Grid item sm={7} md={9}>
              <Container
                style={{ paddingLeft: '0', marginTop: '60px' }}
                maxWidth="xl"
              >
                <Chart />
              </Container>
            </Grid>
          )}
        </Grid>
      </div>
    </AppContext.Provider>
  );
};

export default Root;
