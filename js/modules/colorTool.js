var ColorTool = (function () {
    'use strict';
    var privateObj = {},
        publicObj = {};

    privateObj = {
        componentToHex: function (c) {
            var hex = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }
    };

    publicObj = {
        rgbToHex: function (r, g, b) {
            return privateObj.componentToHex(r) + privateObj.componentToHex(g) + privateObj.componentToHex(b);

        }
    };

    return publicObj;

}());