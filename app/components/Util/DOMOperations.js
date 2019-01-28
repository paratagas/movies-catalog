import ReactDOM from 'react-dom';

function clearInput(inputRef) {
  const inputParentDiv = ReactDOM.findDOMNode(inputRef.current);
  const inputElement = inputParentDiv.querySelector('input');
  inputElement.value = '';
}
export {
  clearInput,
};
