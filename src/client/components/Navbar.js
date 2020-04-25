import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = ({ isLoggedIn }) => {
  return (
    <div id="navbar">
      { !isLoggedIn ?
        <Fragment>
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </Fragment>
        :
        <Fragment>
          <div className="nav-links">
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/transactions">Transactions</Link>
          </div>
          <Logout />
        </Fragment>
      }
    </div>
  );
};

export default Navbar;
