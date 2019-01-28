/*
 * Movie
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RemoveButton.scss';

/* eslint-disable react/prefer-stateless-function */
class RemoveButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    movie: PropTypes.object,
    onClickHandler: PropTypes.func,
  };

  static defaultProps = {
    text: 'Remove',
    movie: {},
    onClickHandler: () => {},
  };

  render() {
    const { text, movie, onClickHandler } = this.props;

    return (
      <button
        className="remove--button"
        onClick={() => onClickHandler(movie)}
      >
        {text}
      </button>
    );
  }
}

export default RemoveButton;
