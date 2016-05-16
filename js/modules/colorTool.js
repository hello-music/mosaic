var ColorTool = (function () {
    'use strict';

    var privateObj = {}, // private module properties and methods
        publicObj = {}; // public API interface obj

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