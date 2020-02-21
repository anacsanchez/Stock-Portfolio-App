import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_TRANSACTIONS } from '../graphql';

const Transactions = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error loading transactions</div>;
  if(!data) return <div>No Transactions available</div>;

  console.log(data,loading,error);

  return (
    <div>
      { data?.getPortfolioTransactions.transactions.map(transaction =>
          <div>{transaction.quantity}</div>
        )
      }
    </div>
  );
};

export default Transactions;
