import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_STOCK } from '../graphql';

const StockSearchForm = ({ handleSearchResult }) => {

  const [ symbolInput, setCurrentSymbolInput ] = useState('');

  const [ searchForStock, { data, loading, error }] = useLazyQuery(GET_STOCK, {
    errorPolicy: "all",
    onCompleted ({ getStock }) { getStock?.stock && handleSearchResult(getStock.stock) },
    onError(err) { console.error(err) }
  });

  return (
    <div className="search-box">
      <input type="text" placeholder="Search for symbol..." onChange={({target}) => setCurrentSymbolInput(target.value)} />
      { loading && <div>Searching...</div>}
      { error && <div>Error: </div>}
      <button type="button" className="search-btn" onClick={() => searchForStock({ variables: { symbol: symbolInput }})}>Search</button>
    </div>
  );
};

export default StockSearchForm;
