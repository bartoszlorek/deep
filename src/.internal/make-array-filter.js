function makeArrayFilter(func) {
    return (predicate, array, parent) => {
        let length = array.length,
            index = -1,
            resIndex = 0,
            result = []

        while (++index < length) {
            let value = func(predicate, array[index], index, parent)
            if (value !== undefined) {
                result[resIndex++] = value
            }
        }
        if (resIndex > 0 || parent === undefined) {
            return result
        }
    }
}

export default makeArrayFilter
