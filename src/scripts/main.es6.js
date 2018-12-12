'use strict';

import { AssetManager } from './assets.es6';
import { Display }      from './display.es6';
import { Engine }       from './engine.es6';
import { World }        from './world.es6';

function onReady() {

    new Promise((resolve) => {
        document.addEventListener('DOMContentLoaded', () => {
            resolve();
        });
    });
}


(async () => {
    //wait for dom rendering
    await onReady();
    //wait for assets to load
    let image = await AssetManager.loadSprite('data/rabbit-trap.png');
    let zone  = await AssetManager.loadJSON('data/zone00.json');

    //start the setup
    const display = new Display(document.querySelector('canvas'));
    display.tilesheet.image = image;

    //set world size
    let world_width  = display.tilesheet.tile_size * zone.columns;
    let world_height = display.tilesheet.tile_size * zone.rows;


    display.setWorldSize(world_width, world_height);
    display.resize();

    const world = new World( world_width, world_height);

    const engine = new Engine( () => {
        world.update();
    }, () => {
        display.drawTileMap(zone.graphical_map, zone.columns);
        display.render();
    }, 1000 / 30);

    engine.start();

})();

