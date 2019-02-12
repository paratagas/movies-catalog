/* eslint-disable */

/*
 * HomePage
 */

import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "react-svg-spinner";
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Button from '../../components/Button';
import MenuBar from '../../components/MenuBar';
import Movie from '../../components/Movie';
import PageTitle from '../../components/PageTitle';
import Search from '../../components/Search';
import MovieDetails from '../MovieDetails';
import Overlay from '../../components/Overlay';
import { BASE_API_URL, BASE_IMAGE_URL, GENRES } from '../App/constants';
import { FETCH_CRITERIA_DEFAULT, PAGE_BUTTONS } from './constants';
import { getReleaseYear } from '../../components/Util/dateTime';
import { clearInput, filterByInput } from '../../components/Util/DOMOperations';
import './HomePage.scss';
import colors from '../../styles/variables.scss';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      moviesFiltered: [],
      movieDetails: null,
      movieCast: null,
      modalWindowVisibility: 'hidden',
      selectedMovieId: null,
      selectedCriteria: FETCH_CRITERIA_DEFAULT,
      initialDataLoad: true,
      loading: false,
    };

    // bindings:
    this.showMovieDetails = this.showMovieDetails.bind(this);
    this.hideMovieDetails = this.hideMovieDetails.bind(this);
    this.createPageButtonsList = this.createPageButtonsList.bind(this);
    this.fetchMoviesByCriteria = this.fetchMoviesByCriteria.bind(this);
    this.filterByInput = filterByInput.bind(this);

    // refs:
    this.searchInput = React.createRef();
  }

  componentDidMount() {
    this.setState({loading: true});
    axios
      .get(`${BASE_API_URL}/movie/${FETCH_CRITERIA_DEFAULT}?api_key=${process.env.API_KEY}`)
      .then(response => {
        const movies = response.data.results;
        this.setState({ movies, loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  showMovieDetails(id) {
    this.setState({loading: true});
    axios.all([
      axios.get(`${BASE_API_URL}/movie/${id}?api_key=${process.env.API_KEY}`),
      axios.get(`${BASE_API_URL}/movie/${id}/casts?api_key=${process.env.API_KEY}`)
    ])
    .then(axios.spread((movieDetailsResponse, movieCastResponse) => {
      const movieDetails = movieDetailsResponse.data;
      const movieCast = movieCastResponse.data;

      this.setState({
        movieDetails,
        movieCast,
        modalWindowVisibility: 'visible',
        selectedMovieId: id,
        loading: false,
      });
    }));
  }

  hideMovieDetails() {
    this.setState({
      movieDetails: null,
      movieCast: null,
      modalWindowVisibility: 'hidden',
      selectedMovieId: null,
    });
  }

  createPageButtonsList() {
    const buttonsList = PAGE_BUTTONS.map((button, index) => {
      return (
        <Button
          text={button.text}
          buttonCriteria={button.criteria}
          selectedCriteria={this.state.selectedCriteria}
          key={`button-${index}`}
          onClickHandler={this.fetchMoviesByCriteria}
        />
      );
    });

    return buttonsList;
  }

  fetchMoviesByCriteria(criteria = FETCH_CRITERIA_DEFAULT) {
    this.setState({loading: true});
    axios
      .get(`${BASE_API_URL}/movie/${criteria}?api_key=${process.env.API_KEY}`)
      .then(response => {
        const movies = response.data.results;
        clearInput(this.searchInput);
        this.setState({
          movies,
          selectedCriteria: criteria,
          initialDataLoad: true,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {
      movies,
      moviesFiltered,
      movieDetails,
      movieCast,
      modalWindowVisibility,
      selectedMovieId,
      initialDataLoad,
      loading,
    } = this.state;

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
          key={`movie-${index}`}
          onClickHandler={this.showMovieDetails}
        />
      );
    });

    return (
      <div className="home--page">
        <div className="home--page__overlay">
          { modalWindowVisibility === 'visible' && <Overlay /> }
        </div>
        <div className="home--page__movie--details--modal">
          {
            modalWindowVisibility === 'visible' &&
            <MovieDetails
              movieDetails={movieDetails}
              movieCast={movieCast}
              id={selectedMovieId}
              onClickHandler={this.hideMovieDetails}
            />
          }
        </div>
        <div className="home--page__page--menu">
          <MenuBar />
        </div>
        <div className="home--page__page--content">
          <div className="home--page__page--content__page--title">
            <PageTitle text={<FormattedMessage {...messages.pageTitle} />} />
          </div>
          <div className="home--page__page--content__search">
            <Search
              ref={this.searchInput}
              onInputHandler={this.filterByInput}
            />
          </div>
          <div className="home--page__page--content__sorting--bar">
            {this.createPageButtonsList()}
          </div>
          <div className="home--page__page--content__movies">
            { loading ?
              (
                <Spinner id="spinner" className="spinner" height="128px" width="128px" color={colors.colourLightest} thickness={5} gap={3} speed="slow" />
              ) :
              moviesList
            }
            </div>
        </div>
      </div>
    );
  }
}
