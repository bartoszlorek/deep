import isPlainObject from 'is-plain-object';

function deepEach(value, iteratee) {
  if (value != null && iteratee != null) {
    baseEach(iteratee, value);
  }
}

function baseEach(iteratee, value, key, parent) {
  if (Array.isArray(value)) {
    return arrayEach(iteratee, value, key);
  }

  if (isPlainObject(value)) {
    return objectEach(iteratee, value, key);
  }

  return iteratee(value, key, parent);
}

function arrayEach(iteratee, array, parent) {
  const length = array.length;
  let index = -1;

  while (++index < length) {
    if (baseEach(iteratee, array[index], index, parent) === false) {
      return false;
    }
  }
}

function objectEach(iteratee, object, parent) {
  const props = Object.keys(object);
  let length = props.length;
  let index = -1;

  while (length--) {
    const key = props[++index];
    if (baseEach(iteratee, object[key], key, parent) === false) {
      return false;
    }
  }
}

export default deepEach;
