import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import StockSearchForm from './StockSearchForm';
import PurchaseStockForm from './PurchaseStockForm';
import { BUY_STOCK, GET_PORTFOLIO, GET_TRANSACTIONS } from '../graphql';
import { formatPrice } from '../utils';

const PurchaseStockSection = ({ balance }) => {
	const [ stock, setCurrentStock ] = useState({});

	const [ buyStock, { error } ] = useMutation(BUY_STOCK, {
		errorPolicy: "all",
		refetchQueries: [
			{ query: GET_PORTFOLIO },
			{ query: GET_TRANSACTIONS }
		],
		onError(err) { console.error(err); }
	});

	const handlePurchase = (quantity) => {
		if (quantity > 0) {
			const { symbol, currentUnitPrice, companyName } = stock;
			buyStock({
				variables: {
					stock: { symbol, currentUnitPrice, companyName, quantity }
				}
			});
		}
	};

	return (
		<div className="sub-section">
			<h2 className="bright-sub-title section-sub-title">
				Buy Stock
            </h2>
			<form id="purchase-stock-form" onSubmit={(evt) => evt.preventDefault()}>
				<StockSearchForm handleSearchResult={(stockSearchResult) => setCurrentStock(stockSearchResult)} />
				{ stock?.currentUnitPrice &&
					<PurchaseStockForm
						currentUnitPrice={stock.currentUnitPrice}
						isUp={stock.isUp}
						handleQuantitySubmit={handlePurchase}
						companyName={stock.companyName}
					/>
				}
			</form>
			<h3 className="section-sub-header">
				Balance: ${formatPrice(balance)}
			</h3>
			{ error ? <div className="error-message">Error: {error.graphQLErrors[0].message}</div> : '' }
		</div>
	);
};

PurchaseStockSection.propTypes = {
	balance: PropTypes.number
};

export default PurchaseStockSection;
