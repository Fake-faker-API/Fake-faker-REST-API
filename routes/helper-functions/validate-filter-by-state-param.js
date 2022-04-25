const { isValidState, removeDuplicatesFromArr } = require('../../utils/general-utils');


function validateFilterByState(filterByStateParam) {
  if (!Array.isArray(filterByStateParam)) filterByStateParam = [filterByStateParam];

  filterByStateParam = filterByStateParam.map(stateName => stateName.toUpperCase());
  filterByStateParam = filterByStateParam.filter(stateName => isValidState(stateName));

  filterByStateParam = removeDuplicatesFromArr(filterByStateParam);
  return filterByStateParam;
}

module.exports = {
  validateFilterByState
}