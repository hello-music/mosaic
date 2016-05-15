var MosaicWorkerHelper = (function (CONSTANTS, HTTP) {
    'use strict';
    var privateObj = {},
        publicObj = {};

    privateObj = {
        returnResponse: function (response) {
            return response;
        },
        handleError: function (error) {
            alert('Had error fetching tiles: ' + error);
        },
        returnImgRow: function (mosaicRow, svgContent) {
            //postMessage('<div class="mosaic-row">' + svgContent + '</div>');
            mosaicRow.addContent(svgContent);
            postMessage(mosaicRow.row);
        },
        getTile: function (hexColor, currentTileIndex) {
            return HTTP.get(CONSTANTS.get('COLOR_URL') + hexColor, currentTileIndex).then(
                privateObj.returnResponse,
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