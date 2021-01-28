import React from 'react';
import PropTypes from 'prop-types';
import TrendingPrice from './TrendingPrice';
import { formatPrice } from '../utils';

const SingleStock = ({ stock: { symbol, currentUnitPrice, shares, isUp } }) => {
	return (
		<li className="stock">
			<p className="stock-info">
				<span className="stock-symbol">{symbol} - </span>
				<span className="stock-shares"> {shares} Shares </span>
			</p>
			<p className="stock-value">
				<TrendingPrice
					price={formatPrice(currentUnitPrice * shares)}
					isUp={isUp}
				/>
			</p>
		</li>
	);
};

SingleStock.propTypes = {
	stock: PropTypes.shape({
		symbol: PropTypes.string,
		currentUnitPrice: PropTypes.number,
		shares: PropTypes.number,
		isUp: PropTypes.bool
	})
};

export default SingleStock;
