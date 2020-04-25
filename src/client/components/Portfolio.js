import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PurchaseStock from './PurchaseStock';
import PortfolioStocks from './PortfolioStocks';
import { GET_PORTFOLIO } from '../graphql';

export default function Portfolio () {

  const { data, loading, error } = useQuery(GET_PORTFOLIO);

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error displaying portfolio { console.error(error) }</p>;
  if(!data) return <p>Not found</p>;

  const { getPortfolio: { portfolio: { stocks, balance } } } = data;

  return (
    <div id="portfolio">
      <div id="portfolio-header">
        <h2>
          Portfolio (${ Number.parseFloat(stocks.reduce((total, { currentUnitPrice, shares }) => total + (currentUnitPrice * shares), 0)).toFixed(2) })
        </h2>
      </div>
      <div id="portfolio-content">
        <PortfolioStocks stocks={ stocks }/>
        <PurchaseStock balance={ balance } />
      </div>
    </div>
  );
}

