import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGIN_USER } from '../graphql';
import UserForm from './UserForm';

const Login = () => {
  const client = useApolloClient();

  const [ login, { data, loading, error } ] = useMutation(LOGIN_USER, {
    onCompleted({ login: { token } }) {
      if(token?.length) {
        localStorage.setItem("token", token);
        client.writeData({ data: { isLoggedIn: true } });
      }
    },
    onError(err) { console.error(err); }}
  );

  if(loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Login</h2>
      { error && <div>Login Error, please try again</div> }
      <UserForm handleSubmit={(userInput) => login({ variables: { user: { ...userInput } } }) }/>
    </div>
  );
};

export default Login;
