/**
 * Module that being used in the Mosaic Worker in the module of {@link module:MosaicProcessor}
 * Provides helper functions for the workers
 * need {@link module:CONSTANTS} and {@link module:HTTP}
 *
 * @module MosaicWorkerHelper
 */
var MosaicWorkerHelper = (function (CONSTANTS, HTTP) {
    'use strict';

    var privateObj = {}, // private module properties and methods
        publicObj = {}; // public API interface obj
    /**
     * Private object
     * @type {{returnResponse: privateObj.getResponse, handleError: privateObj.handleError, returnImgRow: privateObj.returnImgRow, getTile: privateObj.getTile}}
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
         *
         * @param {@link MosaicRowUI} mosaicRow - the current mosaicRow UI object
         * @param {string} svgContent - svg content in string format
         * @example '<svg><ellipse/></svg>' the ellipse should have proper content
         */
        returnImgRow: function (mosaicRow, svgContent) {
            mosaicRow.addContent(svgContent);
            postMessage(mosaicRow.row);
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
        }
    };

    publicObj = {
        returnImgRow: privateObj.returnImgRow,
        getTile: privateObj.getTile
    };

    return publicObj;
}(CONSTANTS, HTTP));