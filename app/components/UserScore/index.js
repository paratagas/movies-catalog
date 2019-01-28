/*
 * Movie
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UserScore.scss';

/* eslint-disable react/prefer-stateless-function */
class UserScore extends Component {
  static propTypes = {
    score: PropTypes.number,
  };

  static defaultProps = {
    score: 100,
  };

  render() {
    const { score } = this.props;
    const strokeDasharray = `${score}, 100`;

    return (
      <svg viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#333"
          strokeWidth="2"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeDasharray={strokeDasharray}
        />
        <text
          x="45%"
          y="50%"
          textAnchor="middle"
          stroke="#fff"
          strokeWidth="0.25"
          dy=".3em"
        >
          {score}
        </text>
        <text
          x="70%"
          y="35%"
          stroke="#fff"
          fontSize="5"
          strokeWidth="0.1px"
          dy=".3em"
        >
          %
        </text>
      </svg>
    );
  }
}

export default UserScore;
