import isPlainObject from 'is-plain-object'

function deepMap(value, iteratee) {
  if (value == null) {
    return null;
  }

  if (iteratee == null) {
    return value;
  }

  return baseMap(iteratee, value);
}

function baseMap(iteratee, value, key, parent) {
  if (Array.isArray(value)) {
    return arrayMap(iteratee, value, key);
  }

  if (isPlainObject(value)) {
    return objectMap(iteratee, value, key);
  }

  return iteratee(value, key, parent);
}

function arrayMap(iteratee, array, parent) {
  const length = array.length;
  const result = [];
  let index = -1;

  while (++index < length) {
    result[index] = baseMap(iteratee, array[index], index, parent);
  }

  return result;
}

function objectMap(iteratee, object, parent) {
  const props = Object.keys(object);
  const result = {};
  let length = props.length;
  let index = -1;

  while (length--) {
    const key = props[++index];
    result[key] = baseMap(iteratee, object[key], key, parent);
  }

  return result;
}

export default deepMap;
