import React from 'react';

const SingleTransaction = ({ transaction }) => {
  const { id, symbol, quantity, total, companyName } = transaction;
  return (
    <li key={`${id}-transaction`} className="transaction">
      <p className="transaction-info">
        <span className="stock-symbol">BUY {symbol} - </span>
        <span className="stock-shares"> {quantity} Shares @ ${ Number.parseFloat(total).toFixed(2) }</span>
      </p>
    </li>
  );
};

export default SingleTransaction;
