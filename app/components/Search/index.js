/*
 * Movie
 */

import React, { Component } from 'react';
import './Search.scss';

/* eslint-disable react/prefer-stateless-function */
class Search extends Component {
  render() {
    return (
      <div>
        <div className="search">
          <span>
            <i className="fa fa-search" />
            <input type="text" placeholder="Search..." />
          </span>
        </div>
      </div>
    );
  }
}

export default Search;
