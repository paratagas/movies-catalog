/*
 * Movie
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PageTitle.scss';

/* eslint-disable react/prefer-stateless-function */
class PageTitle extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: 'Main',
  };

  render() {
    const { text } = this.props;
    return (
      <div>
        <span className="page--title">{text}</span>
      </div>
    );
  }
}

export default PageTitle;
