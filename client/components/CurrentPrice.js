import React from 'react';

const CurrentPrice = ({ currentUnitPrice, isUp }) => {
  return (
    <div className={ isUp ? 'price-green' : 'price-red'}>Current Price: { currentUnitPrice }</div>
  );
};

export default CurrentPrice;
