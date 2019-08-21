/**
 *  find nested obj by key-value pair
 *
 */
export const findNestedObj = function (entireObj, keyToFind, valToFind) { // eslint-disable-line
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
      if (nestedValue && nestedValue[keyToFind] === valToFind) {
        foundObj = nestedValue;
      }
      return nestedValue;
    });
    return foundObj;
};
