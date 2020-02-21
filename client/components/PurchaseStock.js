import React, { useState, Fragment } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import TickerSearchForm from './TickerSearchForm';
import CurrentStockPrice from './CurrentStockPrice';
import { BUY_STOCK, GET_PORTFOLIO } from '../graphql';

const PurchaseStock = () => {
  const [ stock, setCurrentStock ] = useState({});
  const [ quantity, setQuantity ] = useState(0);
  const client = useApolloClient();

  const [ buyStock, { data, loading, error } ] = useMutation(BUY_STOCK, {
    errorPolicy: "all",
    refetchQueries:[{
      query: GET_PORTFOLIO
    }],
    onError(err) { console.error(err) }
  });

  const handlePurchase = (evt) => {
    evt.preventDefault();
    const { symbol, currentUnitPrice, companyName } = stock;
    buyStock({ variables: { stock: { symbol, currentUnitPrice, companyName, quantity: +quantity }} });
  };

  return (
      <form onSubmit={ handlePurchase }>
        <TickerSearchForm handleSearchResult={(stockSearchResult) => setCurrentStock(stockSearchResult)}/>
        { stock?.currentUnitPrice &&
          <Fragment>
            <CurrentStockPrice currentUnitPrice={stock.currentUnitPrice} isUp={false} />
            <input type="number" placeholder="Qty" name="quantity" onChange={({target}) => setQuantity(target.value) }/>
            <div>Total: {stock?.currentUnitPrice ? (stock.currentUnitPrice * quantity) : 0 }</div>
            <button type="submit">Purchase</button>
          </Fragment>
        }
      </form>
  );
};

export default PurchaseStock;
