function Tile(width, height) {
    'use strict';
    var that = this;
    this.width = width;
    this.height = height;
    this.getAvgRBG = function (rowPixelData, imgWidth, currentTileIndex) {
        var x = 0,
            y = 0,
            r = 0,
            g = 0,
            b = 0,
            dataIndex = 0,
            tileWidth = that.width,
            tileHeight = that.height,
            numOfPixels = getNumOfPixels(tileWidth, tileHeight);
        for (y; y < tileHeight; y += 1) { // loop over each row within the tile
            for (x = 0; x < tileWidth; x += 1) { // loop over each pixel in the tile row
                dataIndex = getDataIndex(x, y, imgWidth, tileWidth, currentTileIndex);
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
    function getDataIndex(x, y, imgWidth, tileWidth, currentTileIndex) {
        return (y * imgWidth + x + currentTileIndex * tileWidth) * 4;
    }

    function getNumOfPixels(width, height) {
        return width * height;
    }
}