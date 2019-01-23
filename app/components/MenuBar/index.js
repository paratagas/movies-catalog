/*
 * Menu bar
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MenuBar.scss';

/* eslint-disable react/prefer-stateless-function */
class MenuBar extends Component {
  render() {
    return (
      <div className="menu--bar">
        <Link to="/" href="/">
          <i className="fa fa-3x fa-bars"> </i>
        </Link>
        <Link to="/watchlist" href="/watchlist">
          <i className="fa fa-3x fa-star"> </i>
        </Link>
      </div>
    );
  }
}

export default MenuBar;
