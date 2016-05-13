/**
 * SVG
 */
var SvgTools = (function(CONSTANTS){
    var privateObj = {
        /**
         * String data of the SVG node
         * e.g.
         * var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
         '<foreignObject width="100%" height="100%">' +
         '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
         '<em>I</em> like ' +
         '<span style="color:white; text-shadow:0 0 2px blue;">' +
         'cheese</span>' +
         '</div>' +
         '</foreignObject>' +
         '</svg>';
         *
         * @param data
         * @returns {*}
         */
        getUrlOfSvgData: function(data){

            var DOMURL = window.URL || window.webkitURL || window,
                svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});

            return DOMURL.createObjectURL(svg);
        },
        composeSvgData: function(content){
            return CONSTANTS.SVG_OPEN_TAG + content + CONSTANTS.SVG_CLOSE_TAG;
        }
    };
    var publicObj = {
        getUrlOfSvgData: privateObj.getUrlOfSvgData,
        composeSvgData: privateObj.composeSvgData
    }

    return publicObj;
}(CONSTANTS));