function makeArrayEach(func) {
    return (iteratee, array, parent) => {
        let length = array.length,
            index = -1

        while (++index < length) {
            if (func(iteratee, array[index], index, parent) === false) {
                return false
            }
        }
    }
}

export default makeArrayEach