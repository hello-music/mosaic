/**
 * ColorTool module that helps doing color conversions or other color related tasks upon needs
 * @module ColorTool
 */
var ColorTool = (function () {
    'use strict';

    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj

    privateObj = {
        /**
         * Converts a component number to a hex number
         * @returns {string}
         * @param {number} componentNumber
         */
        componentToHex: function (componentNumber) {
            var hex = componentNumber.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }
    };

    publicObj = {
        /**
         * Converts RGB values to hex color code
         * needs {@link componentToHex}
         * @param r
         * @param g
         * @param b
         * @returns {*}
         */
        rgbToHex: function (r, g, b) {
            return privateObj.componentToHex(r) + privateObj.componentToHex(g) + privateObj.componentToHex(b);

        }
    };

    return publicObj;

}());