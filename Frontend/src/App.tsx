import React from 'react';
import logo from './logo.svg';

import { Router, Route, Switch } from 'react-router-dom'

import { LoginPage, PrivateComponent, PrivateRoute } from './components';
import history from './history';

const HomePage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const App = () => (
  <div className="app">
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
