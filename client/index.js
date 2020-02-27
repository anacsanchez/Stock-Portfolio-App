import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloLink, concat } from 'apollo-link';

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: "/stock-portfolio/graphql"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') ?? null
    }
  });
  return forward(operation);
});

export const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
  resolvers: {}
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router basename="/stock-portfolio">
      <App />
    </Router>
  </ApolloProvider>
,document.getElementById('app'));
