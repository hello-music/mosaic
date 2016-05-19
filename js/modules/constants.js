/**
 * Defining all the constant values
 *
 * @module CONSTANTS
 */
var CONSTANTS = (function () {
    'use strict';

    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj

    privateObj = {
        COLOR_URL: '/color/',
        MOSAIC_WORKER_JS_FILE_URL: 'js/workers/mosaicWorker.js',
        BACKDROP_ID: 'backdrop',
        /**
         * Get value based on the key
         * @param {string} key
         * @returns {*} - value
         */
        get: function (key) {
            return privateObj[key];
        }
    };
    publicObj = {
        /**
         * Public interface of the {@link privateObj.get} get method
         */
        get: privateObj.get
    };

    return publicObj;
}());