/*
 * Video
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BASE_YOUTUBE_EMBED_URL } from '../../containers/App/constants';
import './Video.scss';

/* eslint-disable react/prefer-stateless-function */
class Video extends Component {
  static propTypes = {
    trailerId: PropTypes.string.isRequired,
    onCloseHandler: PropTypes.func.isRequired,
  };

  render() {
    const { trailerId, onCloseHandler } = this.props;

    return (
      <div className="movie--trailer">
        <div className="movie--trailer__close--video">
          <i className="fa fa-window-close" onClick={onCloseHandler}> </i>
        </div>
        <iframe
          title="trailer"
          width="100%"
          height="100%"
          src={`${BASE_YOUTUBE_EMBED_URL}${trailerId}?controls=1`}
          frameBorder="0"
        >
        </iframe>
      </div>
    );
  }
}

export default Video;
