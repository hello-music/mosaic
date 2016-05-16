var StyleSheetTool = (function () {
    'use strict';
    var privateObj = {},
        publicObj = {};

    privateObj = {
        getStyleSheet: function (index) {
            return document.styleSheets[index];
        },

        addCSS: function (sheet, css, index) {
            sheet.insertRule(css, index);
        },

        getCssRuleLength: function (sheet) {
            return sheet.cssRules.length;
        }
    };

    publicObj = {
        getStyleSheet: privateObj.getStyleSheet,
        addCSS: privateObj.addCSS,
        getCssRuleLength: privateObj.getCssRuleLength
    };

    return publicObj;
}());