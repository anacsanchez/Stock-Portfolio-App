import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_STOCK } from '../graphql';

const TickerSearchForm = ({ handleSearchResult }) => {

  const [ symbolInput, setCurrentSymbolInput ] = useState('');

  const [ searchForStock, { data, loading, error }] = useLazyQuery(GET_STOCK, {
    errorPolicy: "all",
    onCompleted ({ getStock: { stock } }) { stock && handleSearchResult(stock) },
    onError(err) { console.error(err) }
  });

  return (
    <div className="search-box">
      <input type="text" placeholder="Symbol" onChange={({target}) => setCurrentSymbolInput(target.value)} />
      <button type="button" onClick={() => searchForStock({ variables: { symbol: symbolInput }})}>Search</button>
    </div>
  );
};

export default TickerSearchForm;
