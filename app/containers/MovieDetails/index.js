/*
 * Watchlist page
 */

import React, { Component } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../App/constants';
import './MovieDetails.scss';

/* eslint-disable react/prefer-stateless-function */
export default class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${BASE_API_URL}/movie/550?api_key=${process.env.API_KEY}`)
      .then(response => {
        const data = response.data;
        console.log('data in MovieDetails: ', data);
        this.setState({ data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="movie-details">
        movie-details
      </div>
    );
  }
}
