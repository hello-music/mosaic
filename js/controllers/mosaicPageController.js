/**
 * Current page controller
 */
var MosaicPageController = (function (MosaicProcessor, StyleSheetTool) {
    'use strict';

    var privateObj = {},
        publicObj = {};

    privateObj = {
        tileWidth: 0,
        tileHeight: 0,
        // this is the button visible on the page to add a photo, it will trigger the hiddenInput click event
        addImgButton: document.querySelector('#input-button'),
        // the hidden input that selects a file
        hiddenInput: document.querySelector("#source-image"),
        // the canvas that will draw the selected img
        canvas: document.querySelector("#img-canvas"),
        // the container that will display the mosaic img
        mosaicContainer: document.querySelector('#mosaic-container'),
        /**
         * add bindings to dom elements
         */
        addBindings: function () {
            var inputElement = privateObj.hiddenInput,
                inputButton = privateObj.addImgButton;
            inputButton.onclick = function () {
                inputElement.click();
            };
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
                mosaicContainer = privateObj.mosaicContainer,
                imgCanvas = privateObj.canvas,
                mosaicContainerHeight = numOfTilesY * tileHeight;

            mosaicContainer.innerHTML = ''; // initilise mosaic container content

            //mosaicContainer.style.width = mosaicContainerWidth + 'px';
            mosaicContainer.style.height = mosaicContainerHeight + 'px';
            //privateObj.scaleMosaic(mosaicContainer, scale);

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
                canvas = privateObj.canvas,
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
        },

        scaleMosaic: function (mosaicContainer, scale) {
            StyleSheetTool.addScale(mosaicContainer, scale, scale);
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
}(MosaicProcessor, StyleSheetTool));