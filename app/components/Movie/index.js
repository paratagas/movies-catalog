/*
 * Movie
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RemoveButton from '../RemoveButton';
import WatchList from '../../containers/WatchList';
import { WATCH_LIST_URL } from './constants';
import './Movie.scss';

/* eslint-disable react/prefer-stateless-function */
class Movie extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    vote: PropTypes.number,
    year: PropTypes.number,
    imageUrl: PropTypes.string,
    mainGenre: PropTypes.string,
    movie: PropTypes.object,
    parentUpdater: PropTypes.func,
    onClickHandler: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    vote: 0,
    year: 0,
    imageUrl: '',
    mainGenre: '',
    movie: {},
    parentUpdater: () => {},
    onClickHandler: () => {},
  };

  constructor(props) {
    super(props);

    // bindings:
    this.saveMovieToWatchlist = this.saveMovieToWatchlist.bind(this);
    this.removeFromLocalStorage = this.removeFromLocalStorage.bind(this);
  }

  saveMovieToWatchlist(movie) {
    let movies = localStorage.getItem('movies');

    if (!movies) {
      localStorage.setItem('movies', JSON.stringify([]));
    }

    movies = localStorage.getItem('movies');
    movies = JSON.parse(movies);

    const movieExists = movies.some(item => {
      return movie.id === item.id;
    });

    if (movieExists) return;

    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  removeFromLocalStorage(movie) {
    let movies = localStorage.getItem('movies');

    if (!movies) return;

    movies = JSON.parse(movies);

    movies.forEach((item, index, array) => {
      if (movie.id === item.id) {
        array.splice(index, 1);
      }
      return array;
    });

    localStorage.setItem('movies', JSON.stringify(movies));

    if (this.props.parentUpdater) {
      this.props.parentUpdater();
    }
  }

  render() {
    const { id, title, vote, year, imageUrl, mainGenre, movie, onClickHandler } = this.props;
    const isInsideWatchlist = window.location.href.endsWith(WATCH_LIST_URL);

    return (
      <section className="movie">
        <img
          src={imageUrl}
          alt={title}
          onClick={() => onClickHandler(id)}
        />

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
            <i
              className="fa fa-heart"
              onClick={() => this.saveMovieToWatchlist(movie)}
            >
            </i>
          </div>
        </div>

        {
          isInsideWatchlist &&
          <div className="movie__remove">
            <RemoveButton
              text="Remove"
              movie={movie}
              onClickHandler={() => this.removeFromLocalStorage(movie)}
            />
          </div>
        }
      </section>
    );
  }
}

export default Movie;
