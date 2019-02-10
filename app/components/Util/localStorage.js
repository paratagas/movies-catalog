function saveMovieToWatchlist(movie) {
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

export {
  saveMovieToWatchlist,
};
