/**
 * Tile model that contains
 * @param {number} width
 * @param {number} height
 * @constructor Tile
 */
function Tile(width, height) {
    'use strict';
    var that = this;
    this.width = width;
    this.height = height;
    /**
     * Get the avg RGB values of this tile
     * @param {Array} rowPixelData - the pixel data of the row that this tile sits in
     * @param {number} canvasWidth
     * @param {number} currentTileIndex - index of this tile in the tile row
     * @param {?number} unadjustedTileWidth - the default tile width, in case last col tile width < default tile width
     * @returns {{r: number, g: number, b: number}} - color r, g, b values
     */
    this.getAvgRBG = function (rowPixelData, canvasWidth, currentTileIndex, unadjustedTileWidth) {
        var x = 0,
            y = 0,
            r = 0,
            g = 0,
            b = 0,
            dataIndex = 0,
            tileWidth = that.width,
            tileHeight = that.height,
            numOfPixels = getNumOfPixels(tileWidth, tileHeight);
        unadjustedTileWidth = unadjustedTileWidth || tileWidth;
        for (y; y < tileHeight; y += 1) {// loop over each row within the tile
            for (x = 0; x < tileWidth; x += 1) {// loop over each pixel in the tile row
                dataIndex = getDataIndex(x, y, canvasWidth, unadjustedTileWidth, currentTileIndex);
                r += rowPixelData[dataIndex];
                g += rowPixelData[dataIndex + 1];
                b += rowPixelData[dataIndex + 2];
            }
        }
        //calculate avg rgb
        r = Math.round(r / numOfPixels);
        g = Math.round(g / numOfPixels);
        b = Math.round(b / numOfPixels);
        return {
            r: r,
            g: g,
            b: b
        };
    };
    //private method
    /**
     * Get the tile row img data index of current pixel of this tile
     * @param {number} x - current pixel position x in this tile
     * @param {number} y - current pixel position y in this tile
     * @param {number} imgWidth
     * @param {number} tileWidth
     * @param {number} currentTileIndex - index of this tile in the tile row
     * @returns {number}
     */
    function getDataIndex(x, y, imgWidth, tileWidth, currentTileIndex) {
        return (y * imgWidth + x + currentTileIndex * tileWidth) * 4;
    }

    /**
     * Get the number of pixels of this tile
     * @param {number} width
     * @param {number} height
     * @returns {number}
     */
    function getNumOfPixels(width, height) {
        return width * height;
    }
}