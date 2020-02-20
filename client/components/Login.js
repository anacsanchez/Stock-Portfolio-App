import React, { useState, Fragment } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoginForm from './LoginForm';

const LOGIN_USER = gql`
  mutation Login($user: UserAccountInput!) {
    login(input: $user) {
      user {
        id,
        portfolio {
          balance
        }
      },
      token
    }
  }
`;

const Login = () => {
  const client = useApolloClient();

  const [login, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login: { token }}) {
      if(token?.length) {
        localStorage.setItem("token", token);
        client.writeData({ data: { isLoggedIn: true }});
      }
  }
  , onError(err) { console.error(err); }}
  );

  const handleSubmit = ({ email, password }) => {
    return login({ variables: { user: { email, password } }});
  };

  if(loading) return <div>Loading...</div>;

  return (
    <Fragment>
    { error && <div>Login Error, please try again</div> }
    <LoginForm onSubmit={handleSubmit}/>
    </Fragment>
  );
};

export default Login;
