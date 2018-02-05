import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000' }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard/" component={Dashboard} />
      </Fragment>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
