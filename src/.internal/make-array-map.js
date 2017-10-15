function makeArrayMap(func) {
    return (iteratee, array, parent) => {
        let length = array.length,
            index = -1,
            result = []

        while (++index < length) {
            result[index] = func(iteratee, array[index], index, parent)
        }
        return result
    }
}

export default makeArrayMap