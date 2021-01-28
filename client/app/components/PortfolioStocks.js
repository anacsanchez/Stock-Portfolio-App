import React from 'react';
import PropTypes from 'prop-types';
import SingleStock from './SingleStock';

const PortfolioStocks = ({ stocks }) => {
	return (
		<div id="portfolio-stocks">
			{ stocks?.length ?
				stocks.map(stock =>
					<SingleStock key={stock.symbol} stock={stock} />
				)
				: <div>No Stocks Yet! </div>
			}
		</div>
	);
};

PortfolioStocks.propTypes = {
	stocks: PropTypes.array
};

export default PortfolioStocks;
