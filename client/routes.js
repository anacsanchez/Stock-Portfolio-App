import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { IS_LOGGED_IN } from './graphql';
import { Login, Portfolio, Signup, AllTransactions, Navbar } from './components';

const Routes = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
  <Fragment>
  <Navbar isLoggedIn={data?.isLoggedIn}/>
  {
    !data?.isLoggedIn ?
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    :
      <Switch>
        <Route path="/transactions">
          <AllTransactions />
        </Route>
        <Route path="/portfolio">
          <Portfolio />
        </Route>
        <Route path="/">
          <Portfolio />
        </Route>
      </Switch>
  }
  </Fragment>
  );

};

export default Routes;
