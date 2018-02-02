import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Fragment>
  </BrowserRouter>
);

export default App;
