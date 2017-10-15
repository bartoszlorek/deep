import { isPlainObject } from 'lodash'
import makeArrayEach from './.internal/make-array-each'
import makeObjectEach from './.internal/make-object-each'

const arrayEach = makeArrayEach(baseEach)
const objectEach = makeObjectEach(baseEach)

function baseEach(iteratee, value, key, parent) {
    if (Array.isArray(value)) {
        return arrayEach(iteratee, value, key)
    }
    if (isPlainObject(value)) {
        return objectEach(iteratee, value, key)
    }
    return iteratee(value, key, parent)
}

function deepEach(value, iteratee) {
    if (value == null) {
        return null
    }
    if (iteratee == null) {
        return value
    }
    baseEach(iteratee, value)
    return value
}

export default deepEach