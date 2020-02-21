import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import StockSearchForm from './StockSearchForm';
import PurchaseStockForm from './PurchaseStockForm';
import { BUY_STOCK, GET_PORTFOLIO, GET_TRANSACTIONS } from '../graphql';

const PurchaseStock = ({ balance }) => {
  const [ stock, setCurrentStock ] = useState({});

  const [ buyStock, { data, loading, error } ] = useMutation(BUY_STOCK, {
    errorPolicy: "all",
    refetchQueries:[{
      query: GET_PORTFOLIO
    },
    {
      query: GET_TRANSACTIONS
    }],
    onError(err) { console.error(err) }
  });

  const handlePurchase = (quantity) => {
    const { symbol, currentUnitPrice, companyName } = stock;
    buyStock({ variables: { stock: { symbol, currentUnitPrice, companyName, quantity }} });
  };

  return (
    <div className="sub-section">
      <h2 className="section-sub-title">Buy Stock</h2>
      <h3 className="section-sub-header">Balance: ${ Number.parseFloat(balance).toFixed(2) }</h3>
      <form id="purchase-stock-form">
        <StockSearchForm handleSearchResult={(stockSearchResult) => setCurrentStock(stockSearchResult)}/>
        { stock?.currentUnitPrice &&
        <PurchaseStockForm currentUnitPrice={ stock.currentUnitPrice } isUp={ stock.isUp } handleQuantitySubmit={ handlePurchase } companyName={ stock.companyName }/>
        }
      </form>
    </div>
  );
};

export default PurchaseStock;
