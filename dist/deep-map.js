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
