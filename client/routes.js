import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Login, Portfolio, Logout } from './components';

const IS_LOGGED_IN = gql `
  query isLoggedIn {
    isLoggedIn @client
  }
`;

const Routes = () => {
  // const { data: validUser } = useQuery(GET_ME);

  // if(!validUser) {
  //   client.writeData({ data: { isLoggedIn: false }});
  //   localStorage.clear();
  // }
  const { data } = useQuery(IS_LOGGED_IN);

  if(!data?.isLoggedIn) {
    return (
    <Switch>
      <Route path="/">
        <Login />
      </Route>
    </Switch>);
  }
  else {
    return (
    <Switch>
      <Route path="/">
        <Logout />
        <Portfolio />
      </Route>
    </Switch>
    );
  }

};

export default Routes;
