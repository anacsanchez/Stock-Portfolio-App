import React, { Fragment, useState } from 'react';

const PurchaseStockForm = ({ isUp, currentUnitPrice, handleQuantitySubmit }) => {
  const [ quantity, setQuantity ] = useState(0);
  return (
    <Fragment>
      <div className={isUp ? 'price-green' : 'price-red'}>
        { currentUnitPrice }
      </div>
      <input type="number" placeholder="Qty" name="quantity" onChange={({target}) => setQuantity(target.value) }/>
      <div>
        Total: { currentUnitPrice ? Number.parseFloat(currentUnitPrice * quantity).toFixed(2) : 0 }
      </div>
      <button type="button" onClick={() => handleQuantitySubmit(+quantity)}>Purchase</button>
    </Fragment>
  );
};

export default PurchaseStockForm;
