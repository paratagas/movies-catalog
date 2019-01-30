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
          <i className="fa fa-3x fa-list"> </i>
        </Link>
        <Link to="/watchlist" href="/watchlist">
          <i className="fa fa-3x fa-heart"> </i>
        </Link>
        <a href="mailto:paratagas@gmail.com">
          <i className="fa fa-3x fa-envelope"> </i>
        </a>
      </div>
    );
  }
}

export default MenuBar;
