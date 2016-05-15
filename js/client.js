// Edit me.

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
         * Draw mosaic row by row
         * @param canvasCtx
         * @param mosaicRowNum
         * @param imgWidth
         * @param imgHeight
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

/**
 * Current page controller
 */
var PageController = (function (MosaicProcessor) {
    'use strict';

    var privateObj = {},
        publicObj = {};

    privateObj = {
        tileWidth: 0,
        tileHeight: 0,
        /**
         * add bindings to dom elements
         */
        addBindings: function () {
            var inputElement = document.querySelector("#source-image");
            //inputElement.addEventListener("change", this.handleFiles, false);

            inputElement.onchange = this.handleFiles;
        },

        /**
         * Adjust the destination size(width and height) based on the source size(
         * @param destination
         * @param source
         */
        copyWidthAndHeight: function (destination, source) {
            destination.height = source.height;
            destination.width = source.width;
        },

        processImgMosaic: function (img, canvasCtx, tileWidth, tileHeight) {
            var imgWidth = img.width,
                imgHeight = img.height,
                numOfTilesX = Math.ceil(imgWidth / tileWidth),
                numOfTilesY = Math.ceil(imgHeight / tileHeight),
                mosaicRowNum = 0,
                mosaicContainer = document.querySelector('#mosaic-container');

            mosaicContainer.innerHTML = ''; // initilise mosaic container content

            mosaicContainer.style.width = numOfTilesX * tileWidth + 'px';
            mosaicContainer.style.height = numOfTilesY * tileHeight + 'px';


            // initilise the Mosaic Processor
            MosaicProcessor.init(tileWidth, tileHeight, imgWidth, imgHeight, numOfTilesX, numOfTilesY);
            //draw Mosaic row by row
            MosaicProcessor.drawMosaic(canvasCtx, mosaicRowNum, mosaicContainer);
        },

        /**
         * process img
         */
        handleFiles: function () {
            var fileList = this.files,
                selectedFile = fileList[0],
                img = new Image(),
                reader = new FileReader(),
                canvas = document.querySelector("#img-canvas"),
                ctx = canvas.getContext("2d");

            if (selectedFile) {
                //var hRatio = canvas.width / img.width    ;
                //var vRatio = canvas.height / img.height  ;
                //var ratio  = Math.min ( hRatio, vRatio );

                reader.onload = (function (img) {
                    return function () {
                        img.src = reader.result;
                        privateObj.copyWidthAndHeight(canvas, img);
                        ctx.drawImage(img, 0, 0);
                        privateObj.processImgMosaic(img, ctx, privateObj.tileWidth, privateObj.tileHeight);
                    };
                }(img));


                reader.readAsDataURL(selectedFile);
            }
        }
    };

    publicObj = {
        init: function (tileWidth, tileHeight) {
            privateObj.tileWidth = tileWidth;
            privateObj.tileHeight = tileHeight;
            privateObj.addBindings();
        }
    };

    return publicObj;
}(MosaicProcessor));

document.onreadystatechange = function () {
    'use strict';
    if (document.readyState === 'interactive') {
        // document ready
        PageController.init(TILE_WIDTH, TILE_HEIGHT);
    }
};