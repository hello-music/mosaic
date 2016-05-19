/**
 * @module Modal
 */
var Modal = (function (StyleTool, CONSTANTS) {
    'use strict';

    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj

    privateObj = {
        backdrop: document.querySelector('#' + CONSTANTS.get('BACKDROP_ID')),
        setContent: function (content) {
            /**
             * @todo make it load template rather than hard coded
             * @type {string}
             */
            privateObj.backdrop.innerHTML = '<div class="content">' + content + '</div>';
        },
        show: function () {
            StyleTool.show(privateObj.backdrop);
        },
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