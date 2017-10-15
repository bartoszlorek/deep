function makeObjectFilter(func) {
    return (predicate, object, parent) => {
        let props = Object.keys(object),
            length = props.length,
            index = -1,
            resLength = 0,
            result = {}

        while (length--) {
            let key = props[++index],
                value = func(predicate, object[key], key, parent)
            if (value !== undefined) {
                result[key] = value
                resLength += 1
            }
        }
        if (resLength > 0 || parent === undefined) {
            return result
        }
    }
}

export default makeObjectFilter