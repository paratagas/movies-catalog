function getReleaseYear(releaseDate) {
  const date = new Date(releaseDate);
  const releaseYear = date.getFullYear();
  return releaseYear;
}

export {
  getReleaseYear,
};
