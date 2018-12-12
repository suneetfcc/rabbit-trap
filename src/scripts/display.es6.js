'use strict';

export class Display {

    constructor(canvas) {
        this.context = canvas.getContext('2d');
        this.buffer  = document.createElement('canvas').getContext('2d');
        this.tilesheet = new TileSheet(16, 8);
    }

    setWorldSize (width, height) {
        this.buffer.canvas.width = width;
        this.buffer.canvas.height = height;
    }

    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    _resize(width, height, aspect_ratio) {

        if (width / height > aspect_ratio) {
            width = height * aspect_ratio;
        }
        else {
            height = width / aspect_ratio;
        }

        this.context.canvas.width  = width;
        this.context.canvas.height = height;
        this.context.imageSmoothingEnabled = false;

        this.render();
    }

    resize () {
        this._resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, this.buffer.canvas.width / this.buffer.canvas.height);
    }

    drawTileMap(map, columns) {

        map.forEach((tile, index) => {
            let src_x  = this.tilesheet.tile_x(tile);
            let src_y  = this.tilesheet.tile_y(tile);
            let size   = this.tilesheet.tile_size;
            let dest_x = (index % columns) * size;
            let dest_y = Math.floor(index / columns) * size;
            this.buffer.drawImage(this.tilesheet.image, src_x, src_y, size, size, dest_x, dest_y, size, size);
        });
    }

}


export class TileSheet {
    //change this handle size of different widht and height
    constructor (tile_size, columns) {
        this.tile_size = tile_size;
        this.columns   = columns;
        this.image     = null;
    }
    //return the x, y position of a tile (numbered from 0 to n) from the tilesheet
    tile_x(tile) {
        return (tile % this.columns) * this.tile_size;
    }

    tile_y(tile) {
        return Math.floor(tile / this.columns) * this.tile_size;
    }
}
