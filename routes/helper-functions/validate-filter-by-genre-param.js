const { isValidEnum, removeDuplicatesFromArr } = require('../../utils/general-utils');
const { bookGenres } = require('../../utils/custom_dictionaries/genres');


function validateFilterByGenre(filterByGenreParam) {

  if (!Array.isArray(filterByGenreParam)) filterByGenreParam = [filterByGenreParam];

  filterByGenreParam = filterByGenreParam.map(genreName => genreName[0].toUpperCase() + genreName.slice(1).toLowerCase());
  filterByGenreParam = removeDuplicatesFromArr(filterByGenreParam);
  return filterByGenreParam;
}

module.exports = {
  validateFilterByGenre
}