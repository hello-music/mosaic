var StyleTool = (function () {
    var privateObj = {},// private module properties and methods
        publicObj = {};// public API interface obj

    privateObj = {
        show: function (elem) {
            elem.classList.remove('hide');
            elem.classList.add('show');
        },
        hide: function (elem) {
            elem.classList.remove('show');
            elem.classList.add('hide');
        }
    };

    publicObj = {
        show: privateObj.show,
        hide: privateObj.hide
    };

    return publicObj;
}());