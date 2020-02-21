import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';

const Logout = () => {
  const client = useApolloClient();
  return (
    <button className="logout-btn" onClick={() => {
      client.writeData({ data: { isLoggedIn: false } });
      localStorage.clear();
      client.resetStore();
     }} type="button">Logout</button>
  );
};

export default Logout;
