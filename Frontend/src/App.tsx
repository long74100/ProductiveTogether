import React from 'react';
import logo from './logo.svg';

import { Router, Route, Switch } from 'react-router-dom'

import {
  Auth,
  Kanban,
  LoginPage,
  PrivateComponent,
  PublicComponent,
  ModalManager,
  Nav,
  RegisterPage,
  DailyGoals
} from './components';
import history from './history';

const App = () => (
  <div className="app">
    <Auth />
    <Router history={history}>
      <div>
        <PrivateComponent component={Nav} />
        <PrivateComponent component={ModalManager} />
        <div className="app-body">
          <Switch>
            <PrivateComponent exact path="/" component={DailyGoals} />
            <PrivateComponent path='/dailygoal' component={Kanban} />
            <PublicComponent path='/login' component={LoginPage} />
            <PublicComponent path='/Register' component={RegisterPage} />
          </Switch>
        </div>
      </div>
    </Router>
  </div>
);

export default App;
