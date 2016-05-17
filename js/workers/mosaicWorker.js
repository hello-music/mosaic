importScripts('../modules/constants.js', '../modules/http.js',
    '../modules/colorTool.js', '../modules/mosaicWorkerHelper.js',
    '../models/tile.js', '../models/mosaicRowUI.js');

onmessage = function (e) {
    'use strict';

    var data = e.data,
        imgData = data.imgData,
        tileHeight = data.tileHeight,
        tileWidth = data.tileWidth,
        canvasWidth = data.canvasWidth,
        canvasHeight = data.canvasHeight,
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
        currentTile = new Tile(tileWidth, tileHeight),
        mosaicRowUI = new MosaicRowUI();//set the default tile width and tile height

    //adjust current tile height
    if (tileRowYInImg + tileHeight > canvasHeight) {
        currentTile.height = canvasHeight - tileRowYInImg;
    }

    //calculate avg color
    for (currentTileIndex; currentTileIndex < numOfTilesInRow; currentTileIndex += 1) { // loop over each tile in the row
        currentTileXInImg = currentTileIndex * tileWidth; // reset current tile row X in img
        // adjust tile width
        if (currentTileXInImg + tileWidth > canvasWidth) {
            currentTile.width = canvasWidth - currentTileXInImg;
        } else {
            currentTile.width = tileWidth;
        }
        //calculate avg rgb of current tile
        avgRGB = currentTile.getAvgRBG(pixelData, canvasWidth, currentTileIndex);
        hexColor = ColorTool.rgbToHex(avgRGB.r, avgRGB.g, avgRGB.b);
        MosaicWorkerHelper.getTile(hexColor, currentTileIndex).then(function (response) {
            rowContent[response.index] = response.response;
            completedAjax += 1;
            if (completedAjax === numOfTilesInRow) { // all promises have been completed
                svgContent = rowContent.join('');
                MosaicWorkerHelper.returnImgRow(mosaicRowUI, svgContent);
            }
        });
    }
};
