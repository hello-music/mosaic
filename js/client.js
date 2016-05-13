// Edit me.

/**
 * Module that processes img to mosaic
 */
var MosaicProcessor = (function () {

    var privateObj = {

            tileWidth: 0,
            tileHeight: 0,
            imgWidth: 0,
            imgHeight: 0,
            mosaicWorker: null,
            canvasCtx: null,

            /**
             * Draw mosaic row by row
             * @param canvasCtx
             * @param mosaicRowNum
             * @param imgWidth
             * @param imgHeight
             */
            drawMosaic: function (canvasCtx, mosaicRowNum, mosaicContainer) {
                var tileYInImg = mosaicRowNum * privateObj.tileHeight,
                    imgRowData = canvasCtx.getImageData(0, tileYInImg, privateObj.imgWidth, privateObj.tileHeight),
                    rowImagesString = '',
                    worker = privateObj.mosaicWorker = privateObj.mosaicWorker || new Worker("js/mosaicWorker.js");

                worker.postMessage({
                    numOfTilesX: privateObj.numOfTilesX,
                    imgData: imgRowData,
                    tileWidth: privateObj.tileWidth,
                    tileHeight: privateObj.tileHeight
                });

                worker.onmessage = function (e) {
                    mosaicRowNum++;
                    if (mosaicRowNum == privateObj.numOfTilesY) { // all the image rows have been processed
                        worker.terminate();
                        worker = null;
                    }
                    else {
                        //draw current row
                        rowImagesString += e.data; // e.data is in string of div containing the svgs, e.g. '<div><svg></svg><div>'
                        mosaicContainer.innerHTML += rowImagesString;
                        // draw next row
                        privateObj.drawMosaic(canvasCtx, mosaicRowNum, mosaicContainer);
                    }
                };
            }
        },

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
}());

/**
 * Current page controller
 */
var PageController = (function (MosaicProcessor, CONSTANTS) {
    var privateObj = {
        tileWidth: 0,
        tileHeight: 0,
        /**
         * add bindings to dom elements
         */
        addBindings: function () {
            var inputElement = document.getElementById("source-image");
            //inputElement.addEventListener("change", this.handleFiles, false);

            inputElement.onchange = this.handleFiles;
        },

        /**
         * process img
         */
        handleFiles: function () {
            var fileList = this.files,
                selectedFile = fileList[0];

            if (selectedFile) {
                var img = document.createElement("img"),
                    reader = new FileReader(),
                    canvas = document.getElementById("img-canvas"),
                    ctx = canvas.getContext("2d");

                document.getElementById('img-container').innerHTML = CONSTANTS.EMPTY_STRING; // empty previous content
                document.getElementById('img-container').appendChild(img); // add img selected to page


                //var hRatio = canvas.width / img.width    ;
                //var vRatio = canvas.height / img.height  ;
                //var ratio  = Math.min ( hRatio, vRatio );

                reader.onload = (function (img) {
                    return function () {
                        img.src = reader.result;
                        adjustCanvasSize(canvas, img);
                        ctx.drawImage(img, 0, 0);
                        //var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        processImgMosaic(img, ctx, privateObj.tileWidth, privateObj.tileHeight);
                    };
                })(img);

                function processImgMosaic(img, canvasCtx, tileWidth, tileHeight) {
                    var imgWidth = img.width,
                        imgHeight = img.height,
                        numOfTilesX = Math.ceil(imgWidth / tileWidth),
                        numOfTilesY = Math.ceil(imgHeight / tileHeight),
                        mosaicRowNum = 0,
                        mosaicContainer = document.getElementById('mosaic-container');

                    mosaicContainer.style.width = numOfTilesX * tileWidth + 'px';
                    mosaicContainer.style.height = numOfTilesX * tileHeight + 'px';


                    // initilise the Mosaic Processor
                    MosaicProcessor.init(tileWidth, tileHeight, imgWidth, imgHeight, numOfTilesX, numOfTilesY);
                    //draw Mosaic row by row
                    MosaicProcessor.drawMosaic(canvasCtx, mosaicRowNum, mosaicContainer);
                }

                reader.readAsDataURL(selectedFile);
            }

            /**
             * Adjust the destination size(width and height) based on the source size(
             * @param destination
             * @param source
             */
            function adjustCanvasSize(destination, source) {
                destination.height = source.height;
                destination.width = source.width;
            }
        }
    };

    var publicObj = {
        init: function (tileWidth, tileHeight) {
            privateObj.tileWidth = tileWidth;
            privateObj.tileHeight = tileHeight;
            privateObj.addBindings();
        }
    };

    return publicObj;
}(MosaicProcessor, CONSTANTS));

document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
        // document ready
        PageController.init(TILE_WIDTH, TILE_HEIGHT);
    }
};