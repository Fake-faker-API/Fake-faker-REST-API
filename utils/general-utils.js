function validateStringParamIsInt({ value, minInt, maxInt }) {
  let totalRowsInt = parseInt(value, 10);
  
  return totalRowsInt.toString() === value && totalRowsInt >= minInt && totalRowsInt <= maxInt
}

function isValidState(stateName) {
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA',' WV','WI','WY'];

  return states.includes(stateName.toUpperCase());
}

function removeDuplicatesFromArr(arr) {
  return [...new Set(arr)];
}

module.exports = {
  validateStringParamIsInt,
  isValidState,
  removeDuplicatesFromArr
}