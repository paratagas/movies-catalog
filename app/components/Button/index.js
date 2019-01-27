/*
 * Movie
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FETCH_CRITERIA_DEFAULT } from '../../containers/HomePage/constants';
import './Button.scss';

/* eslint-disable react/prefer-stateless-function */
class Button extends Component {
  static propTypes = {
    text: PropTypes.string,
    buttonCriteria: PropTypes.string,
    selectedCriteria: PropTypes.string,
    onClickHandler: PropTypes.func,
  };

  static defaultProps = {
    text: 'Button',
    buttonCriteria: FETCH_CRITERIA_DEFAULT,
    selectedCriteria: FETCH_CRITERIA_DEFAULT,
    onClickHandler: () => {},
  };

  render() {
    const { text, buttonCriteria, selectedCriteria, onClickHandler } = this.props;
    const className = (selectedCriteria === buttonCriteria) ? 'button--selected' : 'button';

    return (
      <button
        className={className}
        type="button"
        onClick={() => onClickHandler(buttonCriteria)}
      >
        {text}
      </button>
    );
  }
}

export default Button;
