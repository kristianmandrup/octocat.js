'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isStr = isStr;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isList = isList;
exports.toArray = toArray;
function isStr(obj) {
    return typeof obj === 'string';
}

function isFunction(obj) {
    return typeof obj === 'function';
}

function isObject(obj) {
    return obj === Object(obj);
}

function isList(val) {
    return Array.isArray(val);
}

var isArray = exports.isArray = isList;
var isFun = exports.isFun = isFunction;

function toArray(val) {
    if (typeof val === 'undefined') return [];
    if (val === null) return [];
    var items = isList(val) ? val : [val];
    items = items.filter(function (item) {
        return item;
    });
    return items;
}