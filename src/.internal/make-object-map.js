function makeObjectMap(func) {
    return (iteratee, object, parent) => {
        let props = Object.keys(object),
            length = props.length,
            index = -1,
            result = {}

        while (length--) {
            let key = props[++index]
            result[key] = func(iteratee, object[key], key, parent)
        }
        return result
    }
}

export default makeObjectMap