import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import NotFound from '../components/notFound/NotFound';
import { Register, Signin } from '../features/authentication';

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/signup" component={Register} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Main;
