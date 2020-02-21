import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const TrendingPrice = ({ isUp, price }) => {
  return (
    <Fragment>
      <span className={`trend-price ${isUp ? 'price-green' : 'price-red'}`}>
      ${ price }
      </span>
      <span className={`trend-arrow ${isUp ? 'price-green' : 'price-red'}`}>
        <FontAwesomeIcon icon={isUp ? faArrowUp : faArrowDown }/>
      </span>
    </Fragment>
  );
};

export default TrendingPrice;
