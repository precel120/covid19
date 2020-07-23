import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalStatisticsTable from './components/GlobalStatisticsTable/GlobalStatisticsTable';
import CountriesList from './components/CountriesList/CountriesList';

const App = () => {
  const [global, setGlobal] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://api.covid19api.com/summary').then(res => {
      if (res.status === 200) {
        const { Global, Countries } = res.data;
        setGlobal({ ...Global });
        setCountries([...Countries]);
      }
    });
  }, []);
  return (
    <>
      <h1>COVID19 statistics for day</h1>
      <GlobalStatisticsTable globalData={global} />
      <CountriesList countries={countries} />
    </>
  );
};

export default App;
