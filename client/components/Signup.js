import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import UserForm from './UserForm';
import { SIGNUP_USER } from '../graphql';

const Signup = () => {
  const client = useApolloClient();

  const [signup, { data, loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted({ signup: { token }}) {
      if(token?.length) {
        localStorage.setItem("token", token);
        client.writeData({ data: { isLoggedIn: true }});
      }
  }
  , onError(err) { console.error(err); }}
  );

  return (
    <div>
      <h1>Signup</h1>
      <UserForm handleSubmit={(userInput) => signup({ variables: { user: {...userInput} } })}/>
    </div>
  );
};

export default Signup;
