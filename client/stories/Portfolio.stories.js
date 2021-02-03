import React from 'react';
import { Portfolio, PortfolioStocks, SingleStock } from '../app/components';

export default {
	title: 'Portfolio'
};

export const PortfolioMain = () => <Portfolio />;

export const PortfolioStocksList = (args) => <PortfolioStocks {...args} />;

PortfolioStocksList.args = {
	stocks: [
		{
			id: 1,
			companyName: "apple",
			currentUnitPrice: 18,
			symbol: "aapl",
			shares: 2,
			isUp: true,
			__typename: "UserStock"
		},
		{
			id: 2,
			symbol: "HEAR",
			currentUnitPrice: 7.27,
			shares: 13,
			companyName: "Turtle Beach Corp.",
			isUp: false,
			__typename: "UserStock"
		}
	]
};

export const Stock = (args) => <SingleStock {...args} />;

Stock.args = {
	stock: {
		id: 1,
		companyName: "apple",
		currentUnitPrice: 18,
		symbol: "aapl",
		shares: 2,
		isUp: true
	}
};
