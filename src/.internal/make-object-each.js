function makeObjectEach(func) {
    return (iteratee, object, parent) => {
        let props = Object.keys(object),
            length = props.length,
            index = -1

        while (length--) {
            let key = props[++index]
            if (func(iteratee, object[key], key, parent) === false) {
                return false
            }
        }
    }
}

export default makeObjectEach
