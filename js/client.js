document.onreadystatechange = function () {
    'use strict';
    if (document.readyState === 'complete') {
        // document ready
        MosaicPageController.init(TILE_WIDTH, TILE_HEIGHT);
    }
};