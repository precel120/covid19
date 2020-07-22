import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      global: {},
      countries: [],
      date: new Date(),
    };
  }

  componentDidMount() {
    axios.get('https://api.covid19api.com/summary').then(res => {
      if (res.status === 200) {
        this.setState(() => ({
          global: { ...res.data.Global },
          countries: [...res.data.Countries],
          date: res.data.Date,
        }));
      }
    });
  }

  render() {
    return <h1>Hello World</h1>;
  }
}

export default App;
