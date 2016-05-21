/**
 * Module that being used in the Mosaic Worker in the module of {@link module:MosaicProcessor}
 * Provides helper functions for the workers
 * need {@link module:CONSTANTS} and {@link module:HTTP}
 *
 * @module MosaicWorkerHelper
 */
var MosaicWorkerHelper = (function (CONSTANTS, HTTP) {
    'use strict';

    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj
    /**
     * Private object
     * @type {{}}
     */
    privateObj = {
        /**
         * Return the response when the ajax call is successful
         * @param {Object} response
         * @returns {Object}
         */
        getResponse: function (response) {
            return response;
        },
        /**
         * Will be called when an error is returned from the ajax call
         * @param {Object} error
         */
        handleError: function (error) {
            alert('Had error fetching tiles: ' + error);
        },
        /**
         * Fetch the tile image from server
         * @param hexColor
         * @param currentTileIndex
         * @returns {*}
         */
        getTile: function (hexColor, currentTileIndex) {
            return HTTP.get(CONSTANTS.get('COLOR_URL') + hexColor, currentTileIndex).then(
                privateObj.getResponse,
                privateObj.handleError
            );
        },
        /**
         *
         * @param currentTileXInImg
         * @param tileWidth
         * @param canvasWidth
         * @returns {*}
         */
        getAdjustedTileWidth: function (currentTileXInImg, tileWidth, canvasWidth) {
            if (currentTileXInImg + tileWidth > canvasWidth) {
                return canvasWidth - currentTileXInImg;
            }
            return tileWidth;
        },
        /**
         *
         * @param tileRowYInImg
         * @param tileHeight
         * @param canvasHeight
         * @returns {*}
         */
        getAdjustedTileHeight: function (tileRowYInImg, tileHeight, canvasHeight) {
            if (tileRowYInImg + tileHeight > canvasHeight) {
                return canvasHeight - tileRowYInImg;
            }
            return tileHeight;
        }
    };

    publicObj = {
        returnImgRow: privateObj.returnImgRow,
        getTile: privateObj.getTile,
        getAdjustedTileWidth: privateObj.getAdjustedTileWidth,
        getAdjustedTileHeight: privateObj.getAdjustedTileHeight,
        /**
         * Get the x of current tile in the image grid
         * @param {number} currentTileIndex - tile index x in the row, 0 ~ (rowNum - 1)
         * @param {number} tileWidth
         * @returns {number}
         */
        getCurrentTileXInImg: function (currentTileIndex, tileWidth){
            return currentTileIndex * tileWidth;
        }
    };

    return publicObj;
}(CONSTANTS, HTTP));