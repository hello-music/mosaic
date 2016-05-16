/**
 * Defining all the constant values
 */
var CONSTANTS = (function () {
    'use strict';

    var privateObj = {}, // private module properties and methods
        publicObj = {}; // public API interface obj

    privateObj = {
        COLOR_URL: '/color/',
        MOSAIC_WORKER_JS_FILE_URL: 'js/workers/mosaicWorker.js',
        get: function (key) {
            return privateObj[key];
        }
    };
    publicObj = {
        get: privateObj.get
    };

    return publicObj;
}());