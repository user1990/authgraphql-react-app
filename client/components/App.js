import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Header from './layout/Header';
import LoginForm from './forms/LoginForm';
import RequireAuth from './auth/RequireAuth';
import SignupForm from './forms/SignupForm';

const App = () => (
  <div className="container">
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
    </Switch>
  </div>
);

export default App;
