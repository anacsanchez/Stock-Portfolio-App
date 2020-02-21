import React from 'react';
import TrendingPrice from './TrendingPrice';

const SingleStock = ({ stock: { symbol, currentUnitPrice, shares, companyName, isUp } }) => {
  return (
    <li className="stock">
      <p className="stock-info">
        <span className="stock-symbol">{symbol} - </span>
        <span className="stock-shares"> {shares} Shares </span>
      </p>
      <p className="stock-value">
        <TrendingPrice price={ Number.parseFloat(currentUnitPrice*shares).toFixed(2) } isUp={isUp} />
      </p>
    </li>
  );
};

export default SingleStock;
