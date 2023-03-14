import { Layout } from 'components/common/Layout';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { About } from './pages/About';
import { CreateNFT } from './pages/CreateNFT';
import { History } from './pages/History';
import { Home } from './pages/Home';

export const Routes = () => (
  <Switch>
    <Route exact path="/about" component={About} />
    <Route>
      <Switch>
        <Layout>
          <Route exact path="/bridge" component={Home} />
          <Route exact path="/history" component={History} />
          <Route exact path="/create" component={CreateNFT} />
          <Redirect to="/bridge" />
        </Layout>
      </Switch>
    </Route>
    <Redirect to="/bridge" />
  </Switch>
);
