import React, { useState } from 'react';
import TrendingPrice from './TrendingPrice';

const PurchaseStockForm = ({ isUp, currentUnitPrice, handleQuantitySubmit, companyName }) => {
  const [ quantity, setQuantity ] = useState(0);
  return (
      <div id="purchase-info-form">
        <p className="company-info">
          Company: {companyName}
        </p>
        <p className="stock-price">
          Price: <TrendingPrice price={ Number.parseFloat(currentUnitPrice).toFixed(2) } isUp={isUp} />
        </p>
        <input aria-label="quantity-input" type="number" placeholder="Quantity" name="quantity" className="quantity-input" onChange={({target}) => setQuantity(target.value) } />
        <p className="total-price">
          Total: { currentUnitPrice ? Number.parseFloat(currentUnitPrice * quantity).toFixed(2) : 0 }
        </p>
        <button type="button" aria-label="submit-purchase-quantity" className="small-submit-btn" onClick={() => handleQuantitySubmit(+quantity)}>
          Buy
        </button>
      </div>
  );
};

export default PurchaseStockForm;
