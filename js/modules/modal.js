/**
 * @module Modal
 */
var Modal = (function (StyleTool, CONSTANTS) {
    'use strict';

    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj

    privateObj = {
        backdrop: document.querySelector('#' + CONSTANTS.get('BACKDROP_ID')),
        /**
         * Set the content of Modal
         * @param {string} content
         */
        setContent: function (content) {
            /**
             * @todo make it load template rather than hard coded
             * @type {string}
             */
            privateObj.backdrop.innerHTML = '<div class="content">' + content + '</div>';
        },
        /**
         * Show modal on the page
         * @param {?string} content - dom string, @example '<div class="content">some content</div>'
         */
        show: function (content) {
            if (content !== null && content !== undefined) {
                privateObj.setContent(content);
            }
            StyleTool.show(privateObj.backdrop);
        },
        /**
         * Hide modal
         */
        hide: function () {
            StyleTool.hide(privateObj.backdrop);
        }
    };

    publicObj = {
        setContent: privateObj.setContent,
        show: privateObj.show,
        hide: privateObj.hide
    };

    return publicObj;
}(StyleTool, CONSTANTS));