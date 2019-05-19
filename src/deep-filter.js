import isPlainObject from 'is-plain-object'

function deepFilter(value, predicate) {
  if (value == null) {
    return null;
  }

  if (predicate == null) {
    return value;
  }

  const result = baseFilter(predicate, value);
  return result !== undefined ? result : null;
}

function baseFilter(predicate, value, key, parent) {
  if (Array.isArray(value)) {
    return arrayFilter(predicate, value, key);
  }

  if (isPlainObject(value)) {
    return objectFilter(predicate, value, key);
  }

  if (predicate(value, key, parent)) {
    return value;
  }
}

function arrayFilter(predicate, array, parent) {
  const length = array.length;
  const result = [];
  let index = -1;
  let resIndex = 0;

  while (++index < length) {
    const value = baseFilter(predicate, array[index], index, parent);

    if (value !== undefined) {
      result[resIndex++] = value;
    }
  }

  if (resIndex > 0 || parent === undefined) {
    return result;
  }
}

function objectFilter(predicate, object, parent) {
  const props = Object.keys(object);
  const result = {};
  let length = props.length;
  let index = -1;
  let resLength = 0;

  while (length--) {
    const key = props[++index];
    const value = baseFilter(predicate, object[key], key, parent);

    if (value !== undefined) {
      result[key] = value;
      resLength += 1;
    }
  }

  if (resLength > 0 || parent === undefined) {
    return result;
  }
}

export default deepFilter;
