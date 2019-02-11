/*
 * Movie details page
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Actor from '../../components/Actor';
import MovieBackgrounds from '../../components/MovieBackgrounds';
import RelatedMovies from '../../components/RelatedMovies';
import UserScore from '../../components/UserScore';
import Video from '../../components/Video';
import VideoOverlay from '../../components/VideoOverlay';
import { BASE_API_URL, BASE_IMAGE_URL, BASE_YOUTUBE_URL } from '../App/constants';
import { getReleaseYear } from '../../components/Util/dateTime';
import { saveMovieToWatchlist } from '../../components/Util/localStorage';
import './MovieDetails.scss';

/* eslint-disable react/prefer-stateless-function */
export default class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetails: null,
      movieCast: null,
      id: null,
      showTrailer: false,
      trailerId: null,
    };

    this.getGenres = this.getGenres.bind(this);
    this.getTopCast = this.getTopCast.bind(this);
    this.getTopCrew = this.getTopCrew.bind(this);
    this.playTrailer = this.playTrailer.bind(this);
    this.closeVideo = this.closeVideo.bind(this);
    this.collectMovieData = this.collectMovieData.bind(this);
    this.saveMovieToWatchlist = saveMovieToWatchlist.bind(this);
  }

  static propTypes = {
    movieDetails: PropTypes.object.isRequired,
    movieCast: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    onClickHandler: PropTypes.func,
  };

  static defaultProps = {
    onClickHandler: () => {},
  };

  componentDidMount() {
    this.setState({
      movieDetails: this.props.movieDetails,
      movieCast: this.props.movieCast,
      id: this.props.id,
      onClickHandler: this.props.onClickHandler,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      movieDetails: props.movieDetails,
      movieCast: props.movieCast,
      id: props.id,
      onClickHandler: props.onClickHandler,
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

  playTrailer() {
    axios
      .get(`${BASE_API_URL}/movie/${this.state.id}/videos?api_key=${process.env.API_KEY}`)
      .then(response => {
        const trailerId = response.data.results[0].key;
        this.setState({
          showTrailer: true,
          trailerId,
        });
        // or to show in separate browser tab:
        // window.open(`${BASE_YOUTUBE_URL}${trailerId}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  closeVideo() {
    this.setState({
      showTrailer: false,
    });
  }

  collectMovieData(movieDetails) {
    const genreIds = movieDetails.genres.map(genre => {
      return genre.id;
    });

    return {
      adult: movieDetails.adult,
      backdrop_path: movieDetails.backdrop_path,
      genre_ids: genreIds,
      id: movieDetails.id,
      original_language: movieDetails.original_language,
      original_title: movieDetails.original_title,
      overview: movieDetails.overview,
      popularity: movieDetails.popularity,
      poster_path: movieDetails.poster_path,
      release_date: movieDetails.release_date,
      title: movieDetails.title,
      video: movieDetails.video,
      vote_average: movieDetails.vote_average,
      vote_count: movieDetails.vote_count,
    };
  }

  render() {
    const { movieDetails, movieCast, id, onClickHandler, showTrailer, trailerId } = this.state;
    const topCrew = movieCast ? this.getTopCrew(movieCast.crew) : null;
    const movie = movieDetails ? this.collectMovieData(movieDetails) : {};

    return (
      movieDetails &&
      movieCast &&
      (
        <div className="movie--details">
          <section className="movie--details__poster">
            <div
              className="movie--details__poster__back--to--list"
              onClick={onClickHandler}
            >
              <i className="fa fa-chevron-circle-left"> </i>
              <span>Back</span>
            </div>
            <div className="movie--details__poster__poster--image">
              <img src={BASE_IMAGE_URL + movieDetails.poster_path} alt="poster" />
            </div>
            <div className="movie--details__poster__actions">
              <i
                className="fa fa-heart"
                onClick={() => this.saveMovieToWatchlist(movie)}
              >
              </i>
              <span>Add to watchlist</span>
            </div>
            <div className="movie--details__poster__related--movies">
              <p>Related movies</p>
              <RelatedMovies id={id} />
            </div>
          </section>
          <section className="movie--details__info">
            <div className="movie--details__info__title">
              <span>{movieDetails.title}</span>
            </div>
            <div className="movie--details__info__main--info">
              <div className="movie--details__info__main--info__user--score">
                <UserScore score={movieDetails.vote_average * 10} />
                <p>User score</p>
              </div>
              <div className="movie--details__info__main--info__play--trailer">
                <i
                  className="fa fa-play"
                  onClick={this.playTrailer}
                >
                </i>
                <p>Play trailer</p>
              </div>
              {showTrailer && <VideoOverlay />}
              {showTrailer && <Video trailerId={trailerId} onCloseHandler={this.closeVideo} />}
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
              <p>Top cast</p>
              <div className="movie--details__info__top--cast__cast--actors">
                {this.getTopCast(movieCast.cast)}
              </div>
            </div>
            <div className="movie--details__info__backgrounds">
              <p>Backgrounds</p>
              <MovieBackgrounds id={id} />
            </div>
          </section>
        </div>
      )
    );
  }
}
