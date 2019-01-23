/*
 * Movie
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

/* eslint-disable react/prefer-stateless-function */
class Button extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: 'Button',
  };

  render() {
    const { text } = this.props;
    return (
      <button className="button" type="button">
        {text}
      </button>
    );
  }
}

export default Button;
