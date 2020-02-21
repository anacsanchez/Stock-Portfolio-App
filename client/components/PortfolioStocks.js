import React from 'react';
import Stock from './Stock';

const PortfolioStocks = ({ stocks }) => {
  return (
    <div>
    Stocks:
    {
      stocks?.map((stock) => <Stock key={stock.symbol} stock={stock} />)
    }
    </div>
  );
};

export default PortfolioStocks;
