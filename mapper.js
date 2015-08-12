var extend = require('util')._extend;

var _undef;

module.exports = function mapper(mapIn, objectIn, objectOut) {
    var regexp = /([a-zA-Z0-9 -]+)(\[([0-9]+)?\])?/g;

    if ('object' !== typeof objectIn) {
        return _undef;
    }

    if ('string' == typeof mapIn) {
        var match;
        var el = objectIn;
        while (match = regexp.exec(mapIn)) {
            if (!el) {
                return _undef;
            }

            if (!el.hasOwnProperty(match[1])) {
                if (/array/gi.test(Object.prototype.toString.call(el))) {
                    return el.reduce(function (arr, el) {
                        arr.push(mapper(match.input.substr(match.index), el));
                        return arr;
                    }, []);
                } else {
                    return _undef;
                }
            }

            el = el[match[1]];

            match[3] && (el = el[match[3]]);
        }

        return el;
    } else if (/array/gi.test(Object.prototype.toString.call(mapIn))) {
        return mapIn.reduce(function (arr, el) {
            arr.push(mapper(el, objectIn));
            return arr;
        }, []);
    } else if (/object/gi.test(Object.prototype.toString.call(mapIn))) {
        var result = {};
        for (var key in mapIn) {
            if (!mapIn.hasOwnProperty(key)) {
                continue;
            }

            var pointer = result;
            var t, p;
            while (match = regexp.exec(key)) {
                t = match;

                if (!pointer.hasOwnProperty(match[1])) {
                    p = pointer;
                    pointer = pointer[match[1]] = match[2] ? [] : {};
                    if (match[3]) {
                        pointer = pointer[match[3]]
                            ?  pointer[match[3]]
                            : (pointer[match[3]] = {});
                    }
                } else {
                    pointer = pointer[match[1]];
                }
            }

            (t && p) && (p[t[1]] = mapper(mapIn[key], objectIn));
        }

        return extend(objectOut || {}, result);
    }

    return _undef;
};
