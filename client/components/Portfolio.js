import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PurchaseStock from './PurchaseStock';
import UserStocks from './UserStocks';
import { GET_PORTFOLIO } from '../graphql';

export default function Portfolio () {

  const { data, loading, error } = useQuery(GET_PORTFOLIO);

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error displaying portfolio { console.error(error) }</p>;
  if(!data) return <p>Not found</p>;

  const { getPortfolio: { portfolio: { stocks, balance } } } = data;

  return (
    <div id="portfolio">
      <h1>Portfolio</h1>
      <PurchaseStock />
      <div>Balance: { balance }</div>
      <UserStocks stocks={ stocks }/>
    </div>
  );
}

