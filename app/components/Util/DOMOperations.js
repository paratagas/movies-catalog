import ReactDOM from 'react-dom';

function clearInput(inputRef) {
  const inputParentDiv = ReactDOM.findDOMNode(inputRef.current);
  const inputElement = inputParentDiv.querySelector('input');
  inputElement.value = '';
}

function filterByInput(inputValue = '') {
  const preparedInputValue = inputValue.toLowerCase();

  const { movies } = this.state;
  const moviesFiltered = movies.filter(movie => {
    const preparedMovieTitle = movie.title.toLowerCase();
    return preparedMovieTitle.includes(preparedInputValue);
  });

  this.setState({
    moviesFiltered,
    initialDataLoad: false,
  });
}

export {
  clearInput,
  filterByInput,
};
