/*
 * Movie
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { WATCH_LIST_URL } from './constants';
import './Movie.scss';

/* eslint-disable react/prefer-stateless-function */
class Movie extends Component {
  static propTypes = {
    title: PropTypes.string,
    vote: PropTypes.number,
    year: PropTypes.number,
    imageUrl: PropTypes.string,
    mainGenre: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    vote: 0,
    year: 0,
    imageUrl: '',
    mainGenre: '',
  };

  render() {
    const { title, vote, year, imageUrl, mainGenre } = this.props;
    const isInsideWatchlist = window.location.href.endsWith(WATCH_LIST_URL);

    return (
      <section className="movie">
        <img src={imageUrl} alt={title} />

        <div className="movie__info--group">
          <div className="movie__info--group__title">{title}</div>
          <div className="movie__info--group__genres--year">
            <div className="movie__info--group__genres--year__genres">
              {mainGenre}
            </div>
            <div className="movie__info--group__genres--year__year">{year}</div>
          </div>
        </div>

        <div className="movie__rating--group">
          <div className="movie__rating--group__rating">{vote}</div>
          <div className="movie__rating--group__actions">
            <i className="fa fa-heart"> </i>
            <i className="fa fa-bookmark"> </i>
            <i className="fa fa-star"> </i>
          </div>
        </div>

        {
          isInsideWatchlist &&
          <div className="movie__remove">
            <Button text="Remove" />
          </div>
        }
      </section>
    );
  }
}

export default Movie;
