import React from 'react';
import logo from './logo.svg';

import { Router, Route, Switch } from 'react-router-dom'

import {
  Kanban,
  LoginPage,
  PrivateComponent,
  PrivateRoute,
  ModalManager,
  Nav,
  RegisterPage,
  DailyGoals
} from './components';
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
        <PrivateComponent component={Nav} />
        <PrivateComponent component={ModalManager} />
        <div className="app-body">
          <Switch>
            <PrivateComponent exact path="/" component={HomePage} />
            <Route path="/dailygoals" component={DailyGoals} />
            <Route path='/dailygoal' component={Kanban} />
            <Route path='/login' component={LoginPage} />
            <Route path='/Register' component={RegisterPage} />
          </Switch>
        </div>
      </div>
    </Router>
  </div>
);

export default App;
