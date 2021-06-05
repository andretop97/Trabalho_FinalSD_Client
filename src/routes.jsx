import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home/home';
import { Account } from './pages/account/account';
function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/account' component={Account} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
