import React from 'react';

const SingleTransaction = ({ transaction }) => {
  const { id, symbol, quantity, total, companyName } = transaction;
  return (
    <li key={`${id}-transaction`} className="transaction">
      <p>{symbol} - {companyName}</p>
      <p>{quantity}</p>
      <p>{total}</p>
    </li>
  );
};

export default SingleTransaction;
