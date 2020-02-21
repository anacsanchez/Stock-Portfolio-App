import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_STOCK } from '../graphql';

const TickerSearchForm = ({ handleSearchResult }) => {

  const [ symbolInput, setCurrentSymbolInput ] = useState('');

  const [ searchForStock, { data, loading, error }] = useLazyQuery(GET_STOCK, {
    errorPolicy: "all",
    onCompleted ({ getStock }) { getStock?.stock && handleSearchResult(getStock.stock) },
    onError(err) { console.error(err) }
  });

  console.dir(error)

  return (
    <div className="search-box">
      <input type="text" placeholder="Symbol" onChange={({target}) => setCurrentSymbolInput(target.value)} />
      { error && <div>Error: </div>}
      <button type="button" onClick={() => searchForStock({ variables: { symbol: symbolInput }})}>Search</button>
    </div>
  );
};

export default TickerSearchForm;
