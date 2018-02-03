import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard/" component={Dashboard} />
    </Fragment>
  </BrowserRouter>
);

export default App;
