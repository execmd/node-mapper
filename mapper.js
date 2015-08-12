var assert = require('assert'),
    extend = require('util')._extend;

var _undef;

module.exports = function mapper(mapIn, objectIn, objectOut) {
    var regexp = /([a-zA-Z0-9 -]+)(\[([0-9]+)?\])?/g;

    if ('object' !== typeof objectIn) {
        return _undef;
    }

    if ('string' == typeof mapIn) {
        var match;
        var res;
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

            if (match[3]) {
                el = el[match[3]];
            }
            res = el;
        }

        return res;
    } else if (/array/gi.test(Object.prototype.toString.call(mapIn))) {
        return mapIn.reduce(function (arr, el) {
            arr.push(mapper(el, objectIn));
            return arr;
        }, []);
    } else if (/object/gi.test(Object.prototype.toString.call(mapIn))) {
        var result = {};
        for (var k in mapIn) {
            if (!mapIn.hasOwnProperty(k)) {
                continue;
            }
            var value = mapper(mapIn[k], objectIn);
            //console.log('k: ', k);
            var pointer = result;
            while (match = regexp.exec(k)) {
                //console.log('objectOut: ', result);
                if (!pointer.hasOwnProperty(match[1])) {
                    pointer = pointer[match[1]] = match[2] ? [] : {};
                    if (match[3]) {
                        pointer = pointer[match[3]]
                            ?  pointer[match[3]]
                            : (pointer[match[3]] = {});
                    }
                } else {
                    pointer = pointer[match[1]];

                    /*if (/array/gi.test(Object.prototype.toString.call(pointer))) {
                     return pointer.reduce(function (arr, el) {
                     //console.log(arguments);

                     arr.push(mapper(match.input.substr(match.index), el));
                     return arr;
                     }, []);
                     }*/
                }
            }

            console.log(require('util')._extend(pointer, value));
            console.log(result);// ;
        }

        return extend(objectOut || {}, result);
    }


    //console.log('string !== typeof mapIn');
    return _undef;
}
