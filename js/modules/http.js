/**
 * Ajax Module that handles the ajax calls
 *
 * @module HTTP
 */
var HTTP = (function () {
    'use strict';

    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj

    privateObj = {
        /**
         * Sends request to the targeted url and returns a promise
         * @param {string} url
         * @param {?number} index - index that can be used for further control by callers or this function itself
         * @returns {Promise}
         */
        get: function (url, index) {
            // Return a new promise.
            return new Promise(function (resolve, reject) {
                // Do the usual XHR stuff
                var req = new XMLHttpRequest();
                req.open('GET', url);

                req.onload = function () {
                    // This is called even on 404 etc
                    // so check the status
                    if (req.status === 200) {
                        // Resolve the promise with the response text
                        resolve({
                            response: req.response,
                            index: index
                        });
                    } else {
                        // Otherwise reject with the status text
                        // which will hopefully be a meaningful error
                        reject(new Error(req.statusText));
                    }
                };

                // Handle network errors
                req.onerror = function () {
                    reject(new Error("Network Error"));
                };

                // Make the request
                req.send();
            });
        }
    };

    publicObj = {
        /**
         * Public interface of the {@see privateObj.get} private get method
         */
        get: privateObj.get
    };

    return publicObj;
}());