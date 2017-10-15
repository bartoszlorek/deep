function makeObjectFilter(func) {
    return (predicate, object, parent) => {
        let props = Object.keys(object),
            length = props.length,
            index = -1,
            resLength = 0,
            result = {}

        while (length--) {
            let key = props[++index],
                next = func(predicate, object[key], key, parent)
            if (next !== undefined) {
                result[key] = next
                resLength += 1
            }
        }
        if (resLength > 0 || parent === undefined) {
            return result
        }
    }
}

export default makeObjectFilter