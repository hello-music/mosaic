/**
 * Module that bridges JS and CSS
 * @module StyleTool
 */
var StyleTool = (function () {
    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj

    /**
     * @type {{show: privateObj.show, hide: privateObj.hide}}
     */
    privateObj = {
        /**
         * Show element
         * @param {Element} elem
         */
        show: function (elem) {
            elem.classList.remove('hide');
            elem.classList.add('show');
        },
        /**
         * Hide element
         * @param {Element} elem
         */
        hide: function (elem) {
            elem.classList.remove('show');
            elem.classList.add('hide');
        }
    };

    /**
     * Public api
     * @type {{show: privateObj.show, hide: privateObj.hide}}
     */
    publicObj = {
        show: privateObj.show,
        hide: privateObj.hide
    };

    return publicObj;
}());