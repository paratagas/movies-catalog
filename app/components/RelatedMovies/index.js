/*
 * Related Movies
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BASE_API_URL, BASE_IMAGE_URL } from '../../containers/App/constants';
import './RelatedMovies.scss';

/* eslint-disable react/prefer-stateless-function */
export default class RelatedMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedMovies: null,
    };

    this.prepareRelatedMovies = this.prepareRelatedMovies.bind(this);
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  componentDidMount() {
    axios
      .get(`${BASE_API_URL}/movie/${this.props.id}/similar?api_key=${process.env.API_KEY}`)
      .then(response => {
        const relatedMovies = response.data;
        this.setState({ relatedMovies });
      })
      .catch(error => {
        console.log(error);
      });
  }

  prepareRelatedMovies(allRelatedMovies) {
    const selectedRelatedMovies = allRelatedMovies.slice(0, 3);
    const topRelatedMovies = selectedRelatedMovies.map((movie, index) => {
      return (
        <div
          className="related--movies__movie"
          key={`related-movie-${index}`}
        >
          <img
            src={BASE_IMAGE_URL + movie.poster_path}
            alt="movie"
            key={`related-movie-img-${index}`}
          />
          <div
            className="related--movies__movie__title"
            key={`related-movie-title-${index}`}
          >
            {movie.title}
          </div>
        </div>
      );
    });

    return topRelatedMovies;
  }

  render() {
    const { relatedMovies } = this.state;
    // console.log('relatedMovies: ', relatedMovies);

    return (
      relatedMovies &&
      (
        <div className="related--movies">
          {this.prepareRelatedMovies(relatedMovies.results)}
        </div>
      )
    );
  }
}
