import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Stock from './Stock';

const GET_PORTFOLIO = gql`
  query GetPortfolio {
    getPortfolio {
      portfolio {
        stocks {
          symbol
          currentUnitPrice
          shares
          companyName
        }
        balance
      }
    }
  }
`;

export default function Portfolio () {

  const { data, loading, error } = useQuery(GET_PORTFOLIO);

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error displaying portfolio { console.error(error) }</p>;
  if(!data) return <p>Not found</p>;

  const { getPortfolio: { portfolio: { stocks, balance } }} = data;

  return (
    <div>
      <div>Balance: { balance }</div>
      Stocks:
      {
        stocks.map((stock) => <Stock key={stock.symbol} stock={stock} />)
      }
    </div>
  );
}

