document.onreadystatechange = function () {
    'use strict';
    if (document.readyState === 'complete') {
        // start the app
        MosaicPageController.init(TILE_WIDTH, TILE_HEIGHT);
    }
};