const { isValidEnum, removeDuplicatesFromArr } = require('../../utils/general-utils');
const { STATES } = require('../../utils/constants/states')


function validateFilterByState(filterByStateParam) {
  if (!Array.isArray(filterByStateParam)) filterByStateParam = [filterByStateParam];

  filterByStateParam = filterByStateParam.map(stateName => stateName.toUpperCase());
  filterByStateParam = removeDuplicatesFromArr(filterByStateParam);

  filterByStateParam = filterByStateParam.filter(stateName => isValidEnum(stateName, STATES));

  return filterByStateParam;
}

module.exports = {
  validateFilterByState
}