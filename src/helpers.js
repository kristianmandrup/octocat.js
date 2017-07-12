export function isStr(obj) {
    return typeof obj === 'string'
}

export function isFunction(obj) {
    return typeof obj === 'function'
}

export function isObject(obj) {
    return obj === Object(obj);
}

export function isList(val) {
    return Array.isArray(val)
}

export const isArray = isList
export const isFun = isFunction

export function toArray(val) {
    if (typeof val === 'undefined') return []
    if (val === null) return []
    let items = isList(val) ? val : [val]
    items = items.filter(item => item)
    return items
}
