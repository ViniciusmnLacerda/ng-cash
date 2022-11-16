import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={Login}
      />
      <Route
        exact
        path="/ngcash/signup"
        component={SignUp}
      />
      <Route
        exact
        path="/ngcash/home/:id"
        component={Home}
      />
    </Switch>

  );
}

export default App;
