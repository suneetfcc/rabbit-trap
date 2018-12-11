'use strict';

export class AssetManager {

    static loadSprite(spritesheet) {

        return new Promise((resolve, reject) => {
            let image         = new Image();
                image.src     = spritesheet;
                image.onload  = (image) => resolve(image);
                image.onerror = (error) => reject(error);
        });
    }

    static loadJSON(json) {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.open('GET', json, true);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status == 200)
                        resolve(JSON.parse(xhr.responseText));
                    else
                        reject(xhr.statusText);
                }
            };
            xhr.send(null);
        });
    }
}
