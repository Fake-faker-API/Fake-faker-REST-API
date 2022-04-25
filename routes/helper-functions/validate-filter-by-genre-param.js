const { removeDuplicatesFromArr } = require('../../utils/general-utils');

function validateFilterByGenre(filterByGenreParam) {

  if (!Array.isArray(filterByGenreParam)) filterByGenreParam = [filterByGenreParam];

  filterByGenreParam = filterByGenreParam.map(genreName => genreName[0].toUpperCase() + genreName.slice(1).toLowerCase());
  filterByGenreParam = removeDuplicatesFromArr(filterByGenreParam);
  return filterByGenreParam;
}

module.exports = {
  validateFilterByGenre
}