import { isPlainObject } from 'lodash'
import makeArrayFilter from './.internal/make-array-filter'
import makeObjectFilter from './.internal/make-object-filter'

const arrayFilter = makeArrayFilter(baseFilter)
const objectFilter = makeObjectFilter(baseFilter)

function baseFilter(predicate, value, key, parent) {
    if (Array.isArray(value)) {
        return arrayFilter(predicate, value, key)
    }
    if (isPlainObject(value)) {
        return objectFilter(predicate, value, key)
    }
    if (predicate(value, key, parent)) {
        return value
    }
}

function deepFilter(value, predicate) {
    if (value == null) {
        return null
    }
    if (predicate == null) {
        return value
    }
    let result = baseFilter(predicate, value)
    return result !== undefined ? result : null
}

export default deepFilter