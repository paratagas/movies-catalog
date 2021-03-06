/*
 * Watchlist page
 */

import React, { Component } from 'react';
import MenuBar from '../../components/MenuBar';
import Movie from '../../components/Movie/index';
import PageTitle from '../../components/PageTitle/index';
import Search from '../../components/Search/index';
import { BASE_IMAGE_URL, GENRES } from '../App/constants';
import { getReleaseYear } from '../../components/Util/dateTime';
import { clearInput, filterByInput } from '../../components/Util/DOMOperations';
import './WatchList.scss';

/* eslint-disable react/prefer-stateless-function */
export default class WatchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      moviesFiltered: [],
      initialDataLoad: true,
    };

    this.triggerUpdate = this.triggerUpdate.bind(this);
    this.filterByInput = filterByInput.bind(this);

    this.searchInput = React.createRef();
  }

  componentWillMount() {
    let movies = localStorage.getItem('movies');

    if (movies) {
      movies = JSON.parse(movies);
      this.setState({ movies });
    }
  }

  componentWillUnmount() {
    clearInput(this.searchInput);
  }

  triggerUpdate() {
    let movies = localStorage.getItem('movies');

    if (movies) {
      movies = JSON.parse(movies);
      this.setState({ movies });
    }
  }

  render() {
    const { movies, moviesFiltered, initialDataLoad } = this.state;
    const moviesToShow = initialDataLoad ? movies : moviesFiltered;
    const moviesList = moviesToShow.map((movie, index) => {
      // movie genre
      const mainGenreId = movie.genre_ids[0];
      const mainGenre = GENRES[mainGenreId];

      return (
        <Movie
          id={movie.id}
          title={movie.title}
          vote={movie.vote_average}
          year={getReleaseYear(movie.release_date)}
          imageUrl={BASE_IMAGE_URL + movie.poster_path}
          mainGenre={mainGenre}
          movie={movie}
          parentUpdater={this.triggerUpdate}
          key={`movie-${index}`}
        />
      );
    });

    return (
      <div className="watchlist">
        <div className="watchlist__page--menu">
          <MenuBar />
        </div>
        <div className="watchlist__page--content">
          <div className="watchlist__page--content__page--title">
            <PageTitle text="My watchlist" />
          </div>
          <div className="watchlist__page--content__search">
            <Search
              ref={this.searchInput}
              onInputHandler={this.filterByInput}
            />
          </div>
          <div className="watchlist__page--content__movies">{moviesList}</div>
        </div>
      </div>
    );
  }
}
