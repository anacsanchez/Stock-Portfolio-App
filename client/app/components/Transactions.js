import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import SingleTransaction from './SingleTransaction';
import { GET_TRANSACTIONS } from '../graphql';

const Transactions = () => {
	const { data, loading, error } = useQuery(GET_TRANSACTIONS);

	if (loading) return <div>Loading Transactions...</div>;
	if (error) return <div>Error loading transactions</div>;
	if (!data?.getPortfolioTransactions?.transactions) return <div>No Transactions Available</div>;

	const { transactions } = data.getPortfolioTransactions;

	return (
		<div id="transactions-section">
			<div id="transactions-header">
				<h2 id="transaction-sub-title">
					Transaction History
				</h2>
			</div>
			<ul id="all-transactions">
				{ transactions?.length ? transactions.map(transaction =>
					<SingleTransaction
						key={transaction.id}
						transaction={transaction}
					/>
					) : 'Go to your Portfolio and buy stocks to get started!'
				}
			</ul>
		</div>
	);
};

export default Transactions;
