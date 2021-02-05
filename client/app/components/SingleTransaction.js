import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../utils';

const SingleTransaction = ({ transaction: { id, symbol, quantity, total, createdAt } }) => {
	const transactionText = `BUY ${symbol?.toUpperCase()} - ${quantity} Shares @ ${formatPrice(total)}`;
	return (
		<li key={`${id}-transaction`} className="transaction">
			<p className="transaction-info">
				<span>{transactionText}</span><span>{createdAt}</span>
			</p>
		</li>
	);
};

SingleTransaction.propTypes = {
	transaction: PropTypes.shape({
		id: PropTypes.string,
		symbol: PropTypes.string,
		quantity: PropTypes.number,
		total: PropTypes.number,
		createdAt: PropTypes.string
	})
};

export default SingleTransaction;
