/**
 * Module that processes img to mosaic
 */
var MosaicProcessor = (function (CONSTANTS) {
    'use strict';
    var privateObj = {},
        publicObj = {};

    privateObj = {

        tileWidth: 0,
        tileHeight: 0,
        imgWidth: 0,
        imgHeight: 0,
        mosaicWorker: null,
        canvasCtx: null,
        /**
         * Get the Mosaic Worker, will create a new one if it is null
         * @returns {null} mosaicWorker
         */
        getMosaicWorker: function () {
            privateObj.mosaicWorker = privateObj.mosaicWorker || new Worker(CONSTANTS.get('MOSAIC_WORKER_JS_FILE_URL'));
            return privateObj.mosaicWorker;
        },
        clearWorker: function () {
            if (privateObj.mosaicWorker !== null) {
                privateObj.mosaicWorker.terminate();
                privateObj.mosaicWorker = null;
            }
        },
        drawCurrentRow: function (mosaicContainer, rowImagesString) {
            mosaicContainer.innerHTML += rowImagesString;// rowImagesString is in string of div containing the svgs, e.g. '<div><svg></svg><div>'
        },

        /**
         *
         * @param canvasCtx
         * @param mosaicRowNum
         * @param mosaicContainer
         * @param convertToPercent
         */
        drawMosaic: function (canvasCtx, mosaicRowNum, mosaicContainer) {
            var tileWidth = privateObj.tileWidth,// tile
                tileHeight = privateObj.tileHeight,
            // img
                imgWidth = privateObj.imgWidth,
                imgHeight = privateObj.imgHeight,
            // num of tiles
                numOfTilesX = privateObj.numOfTilesX,
                numOfTilesY = privateObj.numOfTilesY,
            // tile row upper left pixel y
                tileRowYInImg = mosaicRowNum * tileHeight,

                imgRowData = canvasCtx.getImageData(0, tileRowYInImg, imgWidth, tileHeight),
                worker = privateObj.getMosaicWorker();

            worker.postMessage({
                numOfTilesX: numOfTilesX,
                tileRowYInImg: tileRowYInImg,
                imgData: imgRowData,
                tileWidth: tileWidth,
                tileHeight: tileHeight,
                imgWidth: imgWidth,
                imgHeight: imgHeight
            });

            worker.onmessage = function (e) {
                //draw current row
                privateObj.drawCurrentRow(mosaicContainer, e.data);
                //check if need to draw next row
                mosaicRowNum += 1;
                if (mosaicRowNum === numOfTilesY) { // all the image rows have been processed
                    privateObj.clearWorker();
                } else {
                    // draw next row
                    privateObj.drawMosaic(canvasCtx, mosaicRowNum, mosaicContainer);
                }
            };
        }
    };
    publicObj = {

        init: function (tileWidth, tileHeight, imgWidth, imgHeight, numOfTilesX, numOfTilesY) {
            // tile
            privateObj.tileWidth = tileWidth;
            privateObj.tileHeight = tileHeight;
            // img
            privateObj.imgWidth = imgWidth;
            privateObj.imgHeight = imgHeight;
            //num of tiles
            privateObj.numOfTilesX = numOfTilesX;
            privateObj.numOfTilesY = numOfTilesY;
        },

        drawMosaic: privateObj.drawMosaic
    };

    return publicObj;
}(CONSTANTS));