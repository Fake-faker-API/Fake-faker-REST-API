function validateStringParamIsInt({ value, minInt, maxInt }) {
  let totalRowsInt = parseInt(value, 10);
  
  return totalRowsInt.toString() === value && totalRowsInt >= minInt && totalRowsInt <= maxInt
}

module.exports = {
  validateStringParamIsInt
}