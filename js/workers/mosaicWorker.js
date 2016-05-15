/**
 * Created by kylekan on 8/05/2016.
 */
importScripts('../modules/constants.js', '../modules/http.js', '../modules/colorTools.js', '../models/tile.js');

function returnImgRow(svgContent) {
    postMessage('<div class="mosaic-row">' + svgContent + '</div>');
}

/**
 * e.data[0] = coordinate x
 * e.data[1] = coordinate y
 * @param e
 */
onmessage = function (e) {
    'use strict';

    var data = e.data,
        imgData = data.imgData,
        tileHeight = data.tileHeight,
        tileWidth = data.tileWidth,
        imgWidth = data.imgWidth,
        imgHeight = data.imgHeight,
        tileRowYInImg = data.tileRowYInImg, // tile's y in the image = row num of current row * tile height
        currentTileXInImg = 0,
        pixelData = imgData.data,
        numOfTilesInRow = data.numOfTilesX,
        hexColor = '',
        svgContent = '',
        completedAjax = 0,
        rowContent = [],
        currentTileIndex = 0,
        avgRGB = {},
        currentTile = new Tile(tileWidth, tileHeight);//set the default tile width and tile height

    //adjust current tile height
    if (tileRowYInImg + tileHeight > imgHeight) {
        currentTile.height = imgHeight - tileRowYInImg;
    }

    //calculate avg color
    for (currentTileIndex; currentTileIndex < numOfTilesInRow; currentTileIndex += 1) { // loop over each tile in the row
        //set current tile
        currentTileXInImg = currentTileIndex * tileWidth; // reset current tile row X in img
        // adjust tile width
        if (currentTileXInImg + tileWidth > imgWidth) {
            currentTile.width = imgWidth - currentTileXInImg;
        } else {
            currentTile.width = tileWidth;
        }
        //calculate avg rgb of current tile
        avgRGB = currentTile.getAvgRBG(pixelData, imgWidth, currentTileIndex);
        hexColor = ColorTools.rgbToHex(avgRGB.r, avgRGB.g, avgRGB.b);
        HTTP.get(CONSTANTS.COLOR_URL + hexColor, currentTileIndex).then(
            function (response) { // success
                rowContent[response.index] = response.response;
            }, function (error) { // fail
                console.log("Failed!", error);
            }
        ).then(function () {
            completedAjax += 1;
            if (completedAjax === numOfTilesInRow) { // all promises have been completed
                svgContent = rowContent.join('');
                returnImgRow(svgContent);
            }
        });
    }
};
