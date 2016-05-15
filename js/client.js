document.onreadystatechange = function () {
    'use strict';
    if (document.readyState === 'interactive') {
        // document ready
        MosaicPageController.init(TILE_WIDTH, TILE_HEIGHT);
    }
};