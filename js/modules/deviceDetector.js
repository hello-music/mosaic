var DeviceDetector = (function () {
    'use strict';
    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj

    privateObj = {
        isChrome: function () {
            return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        },

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