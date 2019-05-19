/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isobject = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

function isObjectObject(o) {
  return isobject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

var isPlainObject = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

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

export { deepEach, deepFilter, deepMap };
