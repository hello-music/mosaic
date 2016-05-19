/**
 * Detect devices: mobile, desktop, browser, etc
 * @module DeviceDetector
 */
var DeviceDetector = (function () {
    'use strict';
    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj

    privateObj = {
        /**
         * Detect if browser is Chrome
         * @returns {boolean}
         */
        isChrome: function () {
            return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        },

        /**
         * Detect if IOS devices
         * @returns {boolean}
         */
        isIOS: function () {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        }
    };

    publicObj = {
        isChrome: privateObj.isChrome,
        isIOS: privateObj.isIOS
    };

    return publicObj;
}());