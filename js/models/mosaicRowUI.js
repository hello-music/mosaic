function MosaicRowUI() {
    'use strict';
    var that = this;
    this.row = '<div class="mosaic-row"></div>';
    this.addContent = function (content) {
        var row = that.row,
            index = row.indexOf('>') + 1,
            firstPart = row.slice(0, index),
            secondPart = row.slice(index);

        that.row = firstPart + content + secondPart;
    };
}