var StyleSheetTool = (function () {
    'use strict';

    var privateObj = {}, // private module properties and methods
        publicObj = {}; // public API interface obj

    privateObj = {
        getStyleSheet: function (index) {
            return document.styleSheets[index];
        },

        addCSS: function (sheet, css, index) {
            sheet.insertRule(css, index);
        },

        getCssRuleLength: function (sheet) {
            return sheet.cssRules.length;
        },

        addScale: function (ele, x, y) {
            ele.style.transform = 'scale(' + x + ',' + y + ')';
        }
    };

    publicObj = {
        getStyleSheet: privateObj.getStyleSheet,
        addCSS: privateObj.addCSS,
        getCssRuleLength: privateObj.getCssRuleLength,
        addScale: privateObj.addScale
    };

    return publicObj;
}());