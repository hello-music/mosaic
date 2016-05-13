/**
 * Defining all the constant values
 */
var CONSTANTS = (function () {
    var privateObj = {
        EMPTY_STRING: '',
        SVG_OPEN_TAG: '<svg xmlns="http://www.w3.org/2000/svg">',
        SVG_CLOSE_TAG: '</svg>',
        COLOR_URL: '/color/'
    };

    return copiedObject(privateObj);

    /**
     * deep copy of a object
     * @param fromObj
     * @returns {{}}
     */
    function copiedObject(fromObj) {
        var toObj = {};

        for (key in fromObj) {
            toObj[key] = fromObj[key];
        }

        return toObj;
    }
}());