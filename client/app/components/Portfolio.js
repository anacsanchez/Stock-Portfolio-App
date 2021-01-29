import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PurchaseStockSection from './PurchaseStockSection';
import PortfolioStocks from './PortfolioStocks';
import { GET_PORTFOLIO } from '../graphql';
import { formatPrice } from '../utils';

export default function Portfolio() {
	const { data, loading, error } = useQuery(GET_PORTFOLIO);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error displaying portfolio {console.error(error)}</p>;
	if (!data) return <p>Not found</p>;

	const { getPortfolio: { portfolio: { stocks, balance } } } = data;

	const portfolioTotal = stocks.reduce((total, { currentUnitPrice, shares }) => total + (currentUnitPrice * shares), 0);

	return (
		<div id="portfolio">
			<div id="portfolio-header">
				<h2>
					My Portfolio (${formatPrice(portfolioTotal)})
				</h2>
			</div>
			<div id="portfolio-content">
				<PortfolioStocks stocks={stocks} />
				<PurchaseStockSection balance={balance} />
			</div>
		</div>
	);
}

