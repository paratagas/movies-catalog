/*
 * Watchlist page
 */

import React, { Component } from 'react';
import axios from 'axios';
// import autobind from 'autobind-decorator';
import MenuBar from '../../components/MenuBar';
import Movie from '../../components/Movie/index';
import PageTitle from '../../components/PageTitle/index';
import Search from '../../components/Search/index';
import { IMAGE_BASE_URL, GENRES } from '../HomePage/constants';
import './WatchList.scss';

/* eslint-disable react/prefer-stateless-function */
export default class WatchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/popular?api_key=1ae6bf73ea58a58290edad6afca876a9',
      )
      .then(response => {
        const movies = response.data.results;
        console.log('movies: ', movies);
        this.setState({ movies });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.state;
    const moviesList = movies.map(movie => {
      console.log('movie: ', movie);
      // movie year
      const date = new Date(movie.release_date);
      const year = date.getFullYear();

      // movie genre
      const mainGenreId = movie.genre_ids[0];
      const mainGenre = GENRES[mainGenreId];

      return (
        <Movie
          title={movie.title}
          vote={movie.vote_average}
          year={year}
          imageUrl={IMAGE_BASE_URL + movie.poster_path}
          mainGenre={mainGenre}
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
            <Search />
          </div>
          <div className="watchlist__page--content__movies">{moviesList}</div>
        </div>
      </div>
    );
  }
}
