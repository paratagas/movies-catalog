/*
 * Movie
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PLACEHOLDER } from './constants';
import './Search.scss';

/* eslint-disable react/prefer-stateless-function */
class Search extends Component {
  static propTypes = {
    onInputHandler: PropTypes.func,
  };

  static defaultProps = {
    onInputHandler: () => {},
  };

  render() {
    const { onInputHandler } = this.props;

    return (
      <div>
        <div className="search">
          <span>
            <i className="fa fa-search" />
            <input
              type="text"
              placeholder={PLACEHOLDER}
              onChange={() => onInputHandler(event.target.value)}
              onFocus={(event) => event.target.placeholder = ''}
              onBlur={(event) => event.target.placeholder = PLACEHOLDER}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default Search;
