/*
 * HomePage
 */

import React, { Component } from 'react';
import axios from 'axios';
// import autobind from 'autobind-decorator';
import Button from '../../components/Button';
import MenuBar from '../../components/MenuBar';
import Movie from '../../components/Movie';
import PageTitle from '../../components/PageTitle';
import Search from '../../components/Search';
import { BASE_API_URL, BASE_IMAGE_URL, GENRES } from '../App/constants';
import { getReleaseYear } from '../../components/Util/dateTime';
import './HomePage.scss';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${BASE_API_URL}/movie/popular?api_key=${process.env.API_KEY}`)
      .then(response => {
        const movies = response.data.results;
        // console.log('movies: ', movies);
        this.setState({ movies });
      })
      .catch(error => {
        // console.log(error);
      });
  }

  render() {
    const buttonNames = ['Popular', 'Top rated', 'Upcoming', 'Now playing'];
    const buttonsList = buttonNames.map(text => <Button text={text} />);

    const { movies } = this.state;
    const moviesList = movies.map(movie => {
      console.log('movie: ', movie);

      // movie genre
      const mainGenreId = movie.genre_ids[0];
      const mainGenre = GENRES[mainGenreId];

      return (
        <Movie
          title={movie.title}
          vote={movie.vote_average}
          year={getReleaseYear(movie.release_date)}
          imageUrl={BASE_IMAGE_URL + movie.poster_path}
          mainGenre={mainGenre}
        />
      );
    });

    return (
      <div className="home--page">
        <div className="home--page__page--menu">
          <MenuBar />
        </div>
        <div className="home--page__page--content">
          <div className="home--page__page--content__page--title">
            <PageTitle text="All movies" />
          </div>
          <div className="home--page__page--content__search">
            <Search />
          </div>
          <div className="home--page__page--content__sorting--bar">
            {buttonsList}
          </div>
          <div className="home--page__page--content__movies">{moviesList}</div>
        </div>
      </div>
    );
  }
}
