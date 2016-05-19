document.onreadystatechange = function () {
    'use strict';
    if (document.readyState === 'complete') {
        // start the app
        if (DeviceDetector.isChrome() || DeviceDetector.isIOS()) {
            MosaicPageController.init(TILE_WIDTH, TILE_HEIGHT);
        }
        else {
            Modal.setContent('Please use Chrome');
            Modal.show();
        }
    }
};