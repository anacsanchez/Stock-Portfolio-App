import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = ({ isLoggedIn }) => {
  return (
    <div id="navbar">
      { !isLoggedIn ?
        <Fragment>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </Fragment>
        :
        <Fragment>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/transactions">Transactions</Link>
          <Logout />
        </Fragment>
      }
    </div>
  );
};

export default Navbar;
