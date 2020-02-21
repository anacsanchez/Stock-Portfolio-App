import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import TickerSearchForm from './TickerSearchForm';
import CurrentPrice from './CurrentPrice';
import { BUY_STOCK } from '../graphql';

const Purchase = () => {
  const [ stock, setCurrentStock ] = useState({});
  const [ quantity, setQuantity ] = useState(0);

  const [ buyStock, { data, loading, error} ] = useMutation(BUY_STOCK);

  const handlePurchase = (evt) => {
    evt.preventDefault();
    buyStock({ variables: { stock: { ...stock, quantity: +quantity }} });
  };

  return (
      <form onSubmit={ handlePurchase }>
        <TickerSearchForm handleSearchResult={(stockSearchResult) => setCurrentStock(stockSearchResult)}/>
        { stock?.currentUnitPrice &&
          <CurrentPrice currentUnitPrice={stock.currentUnitPrice} isUp={false} />
        }
        <input type="number" placeholder="Qty" name="quantity" onChange={({target}) => setQuantity(target.value) }/>
        <div>Total: {stock?.currentUnitPrice ? (stock.currentUnitPrice * quantity) : 0 }</div>
        <button type="submit">Purchase</button>
      </form>
  );
};

export default Purchase;
