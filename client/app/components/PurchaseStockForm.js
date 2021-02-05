import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrendingPrice from './TrendingPrice';
import { formatPrice } from '../utils';

const PurchaseStockForm = ({ isUp, currentUnitPrice, handleQuantitySubmit, companyName }) => {
	const [ quantity, setQuantity ] = useState(0);
	return (
		<div id="purchase-info-form">
			<p className="company-info">
				Company: {companyName?.length ? companyName : 'N/A'}
			</p>
			<p className="stock-price">
				<span>Price:</span>
				<TrendingPrice
					price={formatPrice(currentUnitPrice)}
					isUp={isUp}
				/>
			</p>
			<input
				aria-label="quantity-input"
				type="number"
				placeholder="Quantity"
				name="quantity"
				className="quantity-input"
				min={0}
				onChange={({ target }) => setQuantity(target.value)}
			/>
			<p className="total-price">
				Total: ${currentUnitPrice ? formatPrice(currentUnitPrice * quantity) : 0}
			</p>
			<button
				type="button"
				aria-label="submit-purchase-quantity"
				className="small-submit-btn"
				onClick={() => handleQuantitySubmit(+quantity)}
			>
				Buy
            </button>
		</div>
	);
};

PurchaseStockForm.propTypes = {
	isUp: PropTypes.bool,
	currentUnitPrice: PropTypes.number,
	handleQuantitySubmit: PropTypes.func,
	companyName: PropTypes.string
};

export default PurchaseStockForm;
