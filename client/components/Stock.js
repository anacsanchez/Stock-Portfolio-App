import React from 'react';

const Stock = ({ stock: { symbol, currentUnitPrice, shares, companyName} }) => {
  return (
    <div>
      <div>Symbol: {symbol}</div>
      <div>Value: {currentUnitPrice*shares}</div>
      <div>Shares: {shares}</div>
      <div>Company: {companyName}</div>
    </div>
  );
};

export default Stock;
