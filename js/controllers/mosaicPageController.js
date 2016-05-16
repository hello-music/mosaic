/**
 * @module MosaicPageController
 * Current page controller
 */
var MosaicPageController = (function (MosaicProcessor) {
    'use strict';

    var privateObj = {}, // private module properties and methods
        publicObj = {}; // public API interface obj

    /**
     * @type {{tileWidth: number, tileHeight: number, addImgButton: Element, hiddenInput: Element, canvas: Element,
     *     mosaicContainer: Element, initMosaicContainer: privateObj.initMosaicContainer, addBindings:
     *     privateObj.addBindings, copyWidthAndHeight: privateObj.copyWidthAndHeight, processImgMosaic:
     *     privateObj.processImgMosaic, handleFiles: privateObj.handleFiles}}
     *
     * @todo improvements: dom elements could be wrapped into different models
     */
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
         * Initialise the mosaic container -> empty it and set its height
         */
        initMosaicContainer: function (height) {
            var mosaicContainer = privateObj.mosaicContainer;
            mosaicContainer.innerHTML = '';
            mosaicContainer.style.height = height + 'px';
        },
        /**
         * Add bindings to dom elements
         *
         * Click on the {@link privateObj.addImgButton} will trigger the {@link privateObj.hiddenInput}
         *
         * When a different file is selected it will trigger the {@link privateObj.handleFiles} function
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
         * @param {Element} destination - dom element
         * @param {Element} source - dom element
         */
        copyWidthAndHeight: function (destination, source) {
            destination.height = source.height;
            destination.width = source.width;
        },
        /**
         * Process image and start drawing mosaic by {@link module:MosaicProcessor}
         * @param {Image} img
         * @param {Object} canvasCtx
         * @param {number} tileWidth
         * @param {number} tileHeight
         */
        processImgMosaic: function (img, canvasCtx, tileWidth, tileHeight) {
            var imgWidth = img.width,
                imgHeight = img.height,
                numOfTilesX = Math.ceil(imgWidth / tileWidth),
                numOfTilesY = Math.ceil(imgHeight / tileHeight),
                mosaicRowNum = 0,
                mosaicContainer = privateObj.mosaicContainer,
                mosaicContainerHeight = numOfTilesY * tileHeight;

            // initilise mosaic container content
            privateObj.initMosaicContainer(mosaicContainerHeight);

            // initilise the Mosaic Processor
            MosaicProcessor.init(tileWidth, tileHeight, imgWidth, imgHeight, numOfTilesX, numOfTilesY);
            //draw Mosaic row by row
            MosaicProcessor.drawMosaic(canvasCtx, mosaicRowNum, mosaicContainer);
        },

        /**
         * Read file and start processing the mosaic img
         *
         * @todo may consider separating the read file and start processing img logic into two functions
         */
        handleFiles: function () {
            var fileList = this.files,
                selectedFile = fileList[0],
                img = new Image(),
                reader = new FileReader(),
                canvas = privateObj.canvas,
                ctx = canvas.getContext("2d");

            if (selectedFile) {
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
        /**
         * Public interface: set tile width and height and initialise dom event bindings
         * @param {number} tileWidth
         * @param {number} tileHeight
         */
        init: function (tileWidth, tileHeight) {
            privateObj.tileWidth = tileWidth;
            privateObj.tileHeight = tileHeight;
            privateObj.addBindings();
        }
    };

    return publicObj;
}(MosaicProcessor));