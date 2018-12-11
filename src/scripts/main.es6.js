'use strict';

import {AssetManager} from './assets.es6';

function onReady() {

    new Promise((resolve) => {
        document.addEventListener('DOMContentLoaded', () => {
            resolve();
        });
    });
}


(async () => {

    await onReady();

    let image = await AssetManager.loadSprite();
    let zone  = await AssetManager.loadJSON();


})();

