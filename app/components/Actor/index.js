/*
 * Actor
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BASE_IMAGE_URL } from '../../containers/App/constants';
import './Actor.scss';

/* eslint-disable react/prefer-stateless-function */
class Actor extends Component {
  static propTypes = {
    actor: PropTypes.object.isRequired,
  };

  render() {
    const { actor } = this.props;

    return (
      <div className="actor">
        <img src={BASE_IMAGE_URL + actor.profile_path} alt={actor.name} />

        <div className="actor__name">
          {actor.name}
        </div>
        <div className="actor__character">
          {actor.character}
        </div>
      </div>
    );
  }
}

export default Actor;
