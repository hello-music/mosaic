/**
 * Processes img to mosaic
 * @module MosaicProcessor
 */
var MosaicProcessor = (function (CONSTANTS) {
    'use strict';

    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj

    /**
     *
     * @type {{tileWidth: number, tileHeight: number, canvasWidth: number, canvasHeight: number, mosaicWorker: null,
     *     canvasCtx: null, getMosaicWorker: privateObj.getMosaicWorker, clearWorker: privateObj.clearWorker,
     *     drawCurrentRow: privateObj.drawCurrentRow, drawMosaic: privateObj.drawMosaic}}
     */
    privateObj = {
        tileWidth: 0,
        tileHeight: 0,
        canvasWidth: 0,
        canvasHeight: 0,
        mosaicWorker: null,
        canvasCtx: null,
        mosaicContainer: null,
        /**
         * Get the Mosaic Worker, will create a new one if it is null
         * @returns {Worker} mosaicWorker {@link privateObj.mosaicWorker}
         */
        getMosaicWorker: function () {
            privateObj.mosaicWorker = privateObj.mosaicWorker || new Worker(CONSTANTS.get('MOSAIC_WORKER_JS_FILE_URL'));
            return privateObj.mosaicWorker;
        },
        /**
         * Terminate web worker {@link privateObj.mosaicWorker} and set it to null
         */
        clearWorker: function () {
            if (privateObj.mosaicWorker !== null) {
                privateObj.mosaicWorker.terminate();
                privateObj.mosaicWorker = null;
            }
        },
        /**
         * Draw current mosaic row on the mosaic img container
         * @param {string} rowImagesString - @example '<div><svg></svg><div>'
         */
        drawCurrentRow: function (rowImagesString) {
            //privateObj.mosaicContainer.innerHTML += rowImagesString;
            //privateObj.mosaicContainer.innerHTML = rowImagesString;
            privateObj.mosaicContainer.appendChild(new MosaicRowUI(rowImagesString));//rowImagesString is in string
            // of div
                                                                          // containing the svgs,
        },
        /**
         * Draw mosaic row in the mosaic container
         *
         * pass data to worker then get the mosaic row back
         * @param canvasCtx - canvas context
         * @param mosaicRowNum - the row number the current row in the tiled img
         * @param mosaicContainer - the dom container that the mosaic img will be in
         */
        drawMosaic: function (canvasCtx, mosaicRowNum) {
            // tile
            var tileWidth = privateObj.tileWidth,
                tileHeight = privateObj.tileHeight,
            // img
                canvasWidth = privateObj.canvasWidth,
                canvasHeight = privateObj.canvasHeight,
            // num of tiles
                numOfTilesX = privateObj.numOfTilesX,
                numOfTilesY = privateObj.numOfTilesY,
            // tile row upper left pixel y
                tileRowYInImg = mosaicRowNum * tileHeight,
            // img row data of the tile row
                imgRowData = canvasCtx.getImageData(0, tileRowYInImg, canvasWidth, tileHeight),
            //worker that will be processing and returning the mosaic row
                worker = privateObj.getMosaicWorker();

            worker.postMessage({
                numOfTilesX: numOfTilesX,
                tileRowYInImg: tileRowYInImg,
                imgData: imgRowData,
                tileWidth: tileWidth,
                tileHeight: tileHeight,
                canvasWidth: canvasWidth,
                canvasHeight: canvasHeight
            });

            worker.onmessage = function (e) {
                //draw current row
                privateObj.drawCurrentRow(e.data);
                //check if need to draw next row
                mosaicRowNum += 1;
                if (mosaicRowNum === numOfTilesY) {// all the image rows have been processed
                    privateObj.clearWorker();
                } else {
                    // draw next row
                    privateObj.drawMosaic(canvasCtx, mosaicRowNum);
                }
            };
        }
    };
    /**
     * Public interface
     */
    publicObj = {
        /**
         * Initialise the private properties
         * @param {number} tileWidth
         * @param {number} tileHeight
         * @param {number} canvasWidth
         * @param {number} canvasHeight
         * @param {number} numOfTilesX
         * @param {number} numOfTilesY
         * @param {Element} mosaicContainer
         */
        init: function (tileWidth, tileHeight, canvasWidth, canvasHeight, numOfTilesX, numOfTilesY, mosaicContainer) {
            // tile
            privateObj.tileWidth = tileWidth;
            privateObj.tileHeight = tileHeight;
            // img
            privateObj.canvasWidth = canvasWidth;
            privateObj.canvasHeight = canvasHeight;
            // num of tiles
            privateObj.numOfTilesX = numOfTilesX;
            privateObj.numOfTilesY = numOfTilesY;
            // mosaic container
            privateObj.mosaicContainer = mosaicContainer;
        },
        /**
         * public api to draw the mosaic row
         */
        drawMosaic: privateObj.drawMosaic,
        /**
         * public api to stop current worker
         */
        stopDrawing: privateObj.clearWorker
    };

    return publicObj;
}(CONSTANTS));