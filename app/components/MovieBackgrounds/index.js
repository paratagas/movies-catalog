/*
* Movie backgrounds
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BASE_API_URL, BASE_IMAGE_URL } from '../../containers/App/constants';
import './MovieBackgrounds.scss';

/* eslint-disable react/prefer-stateless-function */
export default class MovieBackgrounds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieBackgrounds: null,
    };

    this.getMovieBackgrounds = this.getMovieBackgrounds.bind(this);
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  componentDidMount() {
    axios
      .get(`${BASE_API_URL}/movie/${this.props.id}/images?api_key=${process.env.API_KEY}`)
      .then(response => {
        const movieBackgrounds = response.data;
        this.setState({ movieBackgrounds });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMovieBackgrounds(backdrops) {
    const selectedBackdrops = backdrops.slice(0, 4);
    const movieBackgrounds = selectedBackdrops.map((backdrop, index) => {
      return (
        <img
          src={BASE_IMAGE_URL + backdrop.file_path}
          alt="backdrop"
          key={`backdrop-${index}`}
        />
      );
    });

    return movieBackgrounds;
  }

  render() {
    const { movieBackgrounds } = this.state;
    // console.log('movieBackgrounds: ', movieBackgrounds);

    return (
      movieBackgrounds &&
      (
        <div className="movie--backgrounds">
          {this.getMovieBackgrounds(movieBackgrounds.backdrops)}
        </div>
      )
    );
  }
}
