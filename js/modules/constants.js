/**
 * Defining all the constant values
 */
var CONSTANTS = (function () {
    'use strict';
    var privateObj = {
        COLOR_URL: '/color/'
    };

    /**
     * deep copy of a object
     * @param fromObj
     * @returns {{}}
     */
    function copiedObject(fromObj) {
        var toObj = {},
            key = '';

        for (key in fromObj) {
            if (fromObj[key] !== undefined) {
                toObj[key] = fromObj[key];
            }
        }

        return toObj;
    }

    return copiedObject(privateObj);
}());