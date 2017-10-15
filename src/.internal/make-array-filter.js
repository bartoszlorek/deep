function makeArrayFilter(func) {
    return (predicate, array, parent) => {
        let length = array.length,
            index = -1,
            resIndex = 0,
            result = []

        while (++index < length) {
            let next = func(predicate, array[index], index, parent)
            if (next !== undefined) {
                result[resIndex++] = next
            }
        }
        if (resIndex > 0 || parent === undefined) {
            return result
        }
    }
}

export default makeArrayFilter