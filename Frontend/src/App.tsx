import React from 'react';

import { Router, Route, Switch } from 'react-router-dom'

import {
  Auth,
  DailyGoals,
  Footer,
  FocusRooms,
  HubConnection,
  Kanban,
  LoginPage,
  PrivateComponent,
  PublicComponent,
  ModalManager,
  Nav,
  RegisterPage,
  UserProfile
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
            <PrivateComponent path='/profile' component={UserProfile} />
            <PrivateComponent path='/focusrooms' component={FocusRooms} />
            <PrivateComponent path='/rooms/:id' component={HubConnection} />
            <PublicComponent path='/login' component={LoginPage} />
            <PublicComponent path='/Register' component={RegisterPage} />
          </Switch>
        </div>
      </div>
    </Router>
    <Footer />
  </div>
);

export default App;
