import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_STOCKS = gql`
query getStocks($symbols:[String!]) {
  getStocks(symbols: $symbols) {
      stocks {
      symbol
      price
      }
      success
      message
  }
}`;

export default function App () {
  const { data, loading, error} = useQuery(GET_STOCKS, { variables: {"symbols": ["aalz","twtr"]} });
  if(loading) return <p>Loading...</p>
  if(error) return <p>ERROR</p>
  if(!data) return <p>Not found</p>

  return (
    <div>Hi
      {JSON.stringify(data)}
    </div>
  );
}

