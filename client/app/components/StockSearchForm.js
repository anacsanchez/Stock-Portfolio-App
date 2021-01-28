import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_STOCK } from '../graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchDollar } from '@fortawesome/free-solid-svg-icons';

const StockSearchForm = ({ handleSearchResult }) => {
	const [symbolInput, setCurrentSymbolInput] = useState('');

	const [searchForStock, { loading, error }] = useLazyQuery(GET_STOCK, {
		errorPolicy: "all",
		onCompleted({ getStock }) {
			getStock?.stock && handleSearchResult(getStock.stock);
		},
		onError(err) { console.error(err); }
	});

	return (
		<Fragment>
			<div className="search-box">
				<label htmlFor="search-box"></label>
				<input
					aria-label="search-input"
					alt="search"
					type="text"
					placeholder="Search for symbol..."
					onChange={({ target }) => setCurrentSymbolInput(target.value)}
					required
				/>
				<button
					type="button"
					aria-label="search-button"
					className="search-btn"
					onClick={() => searchForStock({ variables: { symbol: symbolInput } })}
				>
					<FontAwesomeIcon
						icon={faSearchDollar}
						size="2x"
					/>
				</button>
			</div>
			<div className="search-status">
				{loading ? <div>Searching...</div> : ''}
				{error ? <div>Error: Symbol Not Found</div> : ''}
			</div>
		</Fragment>
	);
};

StockSearchForm.propTypes = {
	handleSearchResult: PropTypes.func
};

export default StockSearchForm;
