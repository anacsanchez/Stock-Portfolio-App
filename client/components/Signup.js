import React from 'react';
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
    <div className="section">
      <h2 className="section-title">Signup</h2>
      { error && <div>Error: { error.graphQLErrors[0]?.message }</div> }
      <UserForm submitName="Signup" handleSubmit={(userInput) => signup({ variables: { user: {...userInput} } })}/>
    </div>
  );
};

export default Signup;
