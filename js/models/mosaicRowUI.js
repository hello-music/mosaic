/**
 * Mosaic Row UI Model
 * @constructor MosaicRowUI
 */
function MosaicRowUI(content) {
    'use strict';
    this.row = document.createElement('div');
    this.row.className = 'mosaic-row';
    this.row.innerHTML = content || '';
    return this.row;
}