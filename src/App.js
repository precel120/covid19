import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Root from './pages/Root/Root';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Root} />
    </Switch>
  </BrowserRouter>
);

export default App;
