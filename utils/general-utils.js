function validateStringParamIsInt({ value, minInt, maxInt }) {
  let totalRowsInt = parseInt(value, 10);
  
  return totalRowsInt.toString() === value && totalRowsInt >= minInt && totalRowsInt <= maxInt
}

function isValidEnum(elementName, list) {
  for (let index = 0; index < list.length; index++) {
    if (list[index].toUpperCase() === elementName.toUpperCase()) {
      return true;
    }
  }
  return false;
}

function removeDuplicatesFromArr(arr) {
  return [...new Set(arr)];
}

module.exports = {
  validateStringParamIsInt,
  isValidEnum,
  removeDuplicatesFromArr
}