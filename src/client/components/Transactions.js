import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import SingleTransaction from './SingleTransaction';
import { GET_TRANSACTIONS } from '../graphql';

const Transactions = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if(loading) return <div>Loading Transactions...</div>;
  if(error) return <div>Error loading transactions</div>;
  if(!data?.getPortfolioTransactions?.transactions) return <div>No Transactions Available</div>;

  const { transactions } = data.getPortfolioTransactions;

  return (
    <ul id="all-transactions">
      { transactions?.map(transaction =>
          <SingleTransaction key={transaction.id} transaction={   transaction } />
        )
      }
    </ul>
  );
};

export default Transactions;
