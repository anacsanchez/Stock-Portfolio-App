import React from 'react';
import SingleStock from './SingleStock';

const PortfolioStocks = ({ stocks }) => {
  return (
    <div id="portfolio-stocks">
      { stocks && stocks.length ?
          stocks.map((stock) => <SingleStock key={stock.symbol} stock={stock} />)
          :
          <div>No Stocks Yet! </div>
      }
    </div>
  );
};

export default PortfolioStocks;
