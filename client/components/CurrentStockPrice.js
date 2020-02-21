import React from 'react';

const CurrentStockPrice = ({ currentUnitPrice, isUp }) => {
  return (
    <div className={ isUp ? 'price-green' : 'price-red'}>Current Price: { currentUnitPrice }</div>
  );
};

export default CurrentStockPrice;
