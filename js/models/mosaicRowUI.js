/**
 * Mosaic Row UI Model
 * @constructor MosaicRowUI
 */
function MosaicRowUI() {
    'use strict';
    var that = this;
    /**
     * Mosaic Row dom div container
     * @type {string}
     */
    this.row = '<div class="mosaic-row"></div>';
    /**
     * Append string content to the {@link row} row
     * @param {string} content
     */
    this.addContent = function (content) {
        var row = that.row,
            index = row.indexOf('>') + 1,
            firstPart = row.slice(0, index),
            secondPart = row.slice(index);

        that.row = firstPart + content + secondPart;
    };
}