import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import StockSearchForm from './StockSearchForm';
import PurchaseStockForm from './PurchaseStockForm';
import { BUY_STOCK, GET_PORTFOLIO } from '../graphql';

const PurchaseStock = () => {
  const [ stock, setCurrentStock ] = useState({});

  const [ buyStock, { data, loading, error } ] = useMutation(BUY_STOCK, {
    errorPolicy: "all",
    refetchQueries:[{
      query: GET_PORTFOLIO
    }],
    onError(err) { console.error(err) }
  });

  const handlePurchase = (quantity) => {
    const { symbol, currentUnitPrice, companyName } = stock;
    buyStock({ variables: { stock: { symbol, currentUnitPrice, companyName, quantity }} });
  };

  return (
      <form>
        <StockSearchForm handleSearchResult={(stockSearchResult) => setCurrentStock(stockSearchResult)}/>
        { stock?.currentUnitPrice &&
        <PurchaseStockForm currentUnitPrice={stock.currentUnitPrice} isUp={stock.isUp} handleQuantitySubmit={ handlePurchase } />
        }
      </form>
  );
};

export default PurchaseStock;
