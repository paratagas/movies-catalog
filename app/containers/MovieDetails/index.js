/*
 * Movie details page
 */

import React, { Component } from 'react';
import axios from 'axios';
import Actor from '../../components/Actor';
import MovieBackgrounds from '../../components/MovieBackgrounds';
import RelatedMovies from '../../components/RelatedMovies';
import { BASE_API_URL, BASE_IMAGE_URL } from '../App/constants';
import { getReleaseYear } from '../../components/Util/dateTime';
import './MovieDetails.scss';

/* eslint-disable react/prefer-stateless-function */
export default class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetails: null,
      movieCast: null,
    };

    this.getGenres = this.getGenres.bind(this);
    this.getTopCast = this.getTopCast.bind(this);
    this.getTopCrew = this.getTopCrew.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${BASE_API_URL}/movie/424783?api_key=${process.env.API_KEY}`)
      .then(response => {
        const movieDetails = response.data;
        this.setState({ movieDetails });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${BASE_API_URL}/movie/424783/casts?api_key=${process.env.API_KEY}`)
      .then(response => {
        const movieCast = response.data;
        this.setState({ movieCast });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getGenres(genres) {
    const movieGenres = genres.map(genre => {
      return genre.name;
    });

    return movieGenres.join(', ');
  }

  getTopCast(allCast) {
    const topCast = allCast.slice(0, 5);
    const topCastActors = topCast.map((actor, index) => {
      return (
        <Actor
          actor={actor}
          key={`actor-${index}`}
        />
      );
    });

    return topCastActors;
  }

  getTopCrew(allCrew) {
    let topCrew = {};

    allCrew.forEach(crewMember => {
      if (crewMember.department === 'Directing' && crewMember.job === 'Director') {
        topCrew.director = crewMember.name;
      }

      if (crewMember.department === 'Writing' && crewMember.job === 'Screenplay') {
        topCrew.writer = crewMember.name;
      }

      if (crewMember.department === 'Writing' && crewMember.job === 'Story') {
        topCrew.story = crewMember.name;
      }
    });

    return topCrew;
  }

  render() {
    const { movieDetails, movieCast } = this.state;
    console.log('movieDetails: ', movieDetails);
    console.log('movieCast: ', movieCast);
    const topCrew = movieCast ? this.getTopCrew(movieCast.crew) : null;

    return (
      movieDetails &&
      movieCast &&
      (
        <div className="movie--details">
          <section className="movie--details__poster">
            <div className="movie--details__poster__back--to--list">
              <i className="fa fa-chevron-circle-left"> </i>
              <span>Back to the list</span>
            </div>
            <div className="movie--details__poster__poster--image">
              <img src={BASE_IMAGE_URL + movieDetails.poster_path} alt="poster" />
            </div>
            <div className="movie--details__poster__actions">
              <i className="fa fa-bookmark"> </i>
              <span>Bookmark</span>
              <i className="fa fa-star"> </i>
              <span>Add watchlist</span>
            </div>
            <div className="movie--details__poster__related--movies">
              <p>Related movies</p>
              <RelatedMovies />
            </div>
          </section>
          <section className="movie--details__info">
            <div className="movie--details__info__title">
              <span>{movieDetails.title}</span>
            </div>
            <div className="movie--details__info__main--info">
              <div className="movie--details__info__main--info__user--score">
                {movieDetails.vote_average * 10}
                <p>User score</p>
              </div>
              <div className="movie--details__info__main--info__play--trailer">
                <i className="fa fa-play"> </i>
                <p>Play trailer</p>
              </div>
              <div className="movie--details__info__main--info__genres--year--duration--titles">
                <div className="movie--details__info__main--info__genres--year--duration--titles__genres">
                  Genres
                </div>
                <div className="movie--details__info__main--info__genres--year--duration--titles__year">
                  Release year
                </div>
                <div className="movie--details__info__main--info__genres--year--duration--titles__duration">
                  Duration
                </div>
              </div>
              <div className="movie--details__info__main--info__genres--year--duration--content">
                <div className="movie--details__info__main--info__genres--year--duration--content__genres">
                  {this.getGenres(movieDetails.genres)}
                </div>
                <div className="movie--details__info__main--info__genres--year--duration--content__year">
                  {getReleaseYear(movieDetails.release_date)}
                </div>
                <div className="movie--details__info__main--info__genres--year--duration--content__duration">
                  {`${movieDetails.runtime} min`}
                </div>
              </div>
            </div>
            <div className="movie--details__info__overview">
              <p>Overview</p>
              <div className="movie--details__info__overview__text">
                {movieDetails.overview}
              </div>
            </div>
            <div className="movie--details__info__feature--crew">
              <p>Feature crew</p>
              <div className="movie--details__info__feature--crew__container">
                <div className="movie--details__info__feature--crew__container__roles">
                  <span>Director</span>
                  <span>Writer</span>
                  <span>Story</span>
                </div>
                <div className="movie--details__info__feature--crew__container__names">
                  <span>{topCrew ? topCrew.director : ''}</span>
                  <span>{topCrew ? topCrew.writer : ''}</span>
                  <span>{topCrew ? topCrew.story : ''}</span>
                </div>
              </div>
            </div>
            <div className="movie--details__info__top--cast">
              <p>Top billed cast</p>
              <div className="movie--details__info__top--cast__cast--actors">
                {this.getTopCast(movieCast.cast)}
              </div>
            </div>
            <div className="movie--details__info__backgrounds">
              <p>Backgrounds</p>
              <MovieBackgrounds />
            </div>
          </section>
        </div>
      )
    );
  }
}
