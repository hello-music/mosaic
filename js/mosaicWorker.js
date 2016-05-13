/**
 * Created by kylekan on 8/05/2016.
 */
//var i = 0;
//
//function timedCount() {
//    i = i + 1;
//    postMessage(i);
//    setTimeout("timedCount()",500);
//}
//
//timedCount();

importScripts('modules/constants.js', 'modules/http.js', 'modules/svgTools.js');

/**
 * e.data[0] = coordinate x
 * e.data[1] = coordinate y
 * @param e
 */
onmessage = function (e) {
    var data = e.data,
        imgData = data.imgData,
        tileHeight = data.tileHeight,
        tileWidth = data.tileWidth,
        pixelData = imgData.data,
        numOfTilesX = data.numOfTilesX,
        numOfPixelsPerTile = tileWidth * tileHeight,
        dataIndex = 0,
        xStartIndex = 0,
        xTileInImg = 0,
        r = 0,
        g = 0,
        b = 0,
        hexColor = '',
        svgContent = '',
        completedAjax = 0,
        rowContent = [];

    //calculate avg color
    for (var iCurrentTileX = 0; iCurrentTileX < numOfTilesX; iCurrentTileX++) { // loop over each tile in the row
        //avg
        xTileInImg = iCurrentTileX * tileWidth;
        r = 0;
        g = 0;
        b = 0;
        for (var y = 0; y < tileHeight; y++) { // loop over each row within the tile
            xStartIndex = (y * tileWidth + xTileInImg) * 4;
            for (var x = 0; x < tileWidth; x++) { // loop over each pixel in the row
                dataIndex = xStartIndex + x * 4;
                r += pixelData[dataIndex];
                g += pixelData[dataIndex + 1];
                b += pixelData[dataIndex + 2]
            }
        }
        //calculate avg rgb
        r = Math.round(r / numOfPixelsPerTile);
        g = Math.round(g / numOfPixelsPerTile);
        b = Math.round(b / numOfPixelsPerTile);

        hexColor = rgbToHex(r, g, b);

        HTTP.get(CONSTANTS.COLOR_URL + hexColor, iCurrentTileX).then(
            function (response) { // success
                rowContent[response.index] = response.response;
            },

            function (error) { // fail
                console.log("Failed!", error);
            }
        ).then(function(){
            completedAjax++;
            if(completedAjax == numOfTilesX){ // all promises have been completed
                svgContent = rowContent.join('');
                returnImgRow(svgContent);
            }
        });


    }

    function returnImgRow(svgContent){
        postMessage('<div class="mosaic-row">'+svgContent+'</div>');
    }
};

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}
