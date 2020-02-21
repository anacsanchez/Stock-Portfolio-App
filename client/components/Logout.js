import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';

const Logout = () => {
  const client = useApolloClient();
  return (
    <button onClick={() => {
      client.writeData({ data: { isLoggedIn: false } });
      localStorage.clear();
     }} type="button">Logout</button>
  );
};

export default Logout;
