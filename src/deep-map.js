import isPlainObject from 'is-plain-object'
import makeArrayMap from './.internal/make-array-map'
import makeObjectMap from './.internal/make-object-map'

const arrayMap = makeArrayMap(baseMap)
const objectMap = makeObjectMap(baseMap)

function baseMap(iteratee, value, key, parent) {
    if (Array.isArray(value)) {
        return arrayMap(iteratee, value, key)
    }
    if (isPlainObject(value)) {
        return objectMap(iteratee, value, key)
    }
    return iteratee(value, key, parent)
}

function deepMap(value, iteratee) {
    if (value == null) {
        return null
    }
    if (iteratee == null) {
        return value
    }
    return baseMap(iteratee, value)
}

export default deepMap