import React from 'react';

const SingleStock = ({ stock: { symbol, currentUnitPrice, shares, companyName, isUp } }) => {
  return (
    <div className="stock">
      <div>Symbol: {symbol}</div>
      <div className={ isUp ? 'price-green' : 'price-red'}>Value: { Number.parseFloat(currentUnitPrice*shares).toFixed(2) }</div>
      <div>Shares: {shares}</div>
      <div>Company: {companyName}</div>
    </div>
  );
};

export default SingleStock;
