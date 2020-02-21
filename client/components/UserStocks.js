import React from 'react';
import SingleStock from './SingleStock';

const PortfolioStocks = ({ stocks }) => {
  return (
    <div id="portfolio-stocks">
    Stocks:
    {
      stocks?.map((stock) => <SingleStock key={stock.symbol} stock={stock} />)
    }
    </div>
  );
};

export default PortfolioStocks;
