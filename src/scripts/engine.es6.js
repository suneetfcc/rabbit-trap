'use strict';

export class Engine {

    constructor(update, render, time_step) {
        this.accumulated_time = 0;
        this.time_step        = time_step;
        this.animation_frame = null;
        this.update          = update;
        this.render          = render;
        this.time            = 0;
    }

    start () {
        this.time = window.performance.now();
        this.animation_frame = window.requestAnimationFrame(this.run.bind(this));
    }

    run (time) {

        let updated   = false;
        let dt        = time - this.time;

        this.time = time;
        this.accumulated_time += dt;

        while (this.accumulated_time >= this.time_step) {
            updated = true;
            this.update();
            this.accumulated_time -= this.time_step;
        }
        if (updated)
            this.render();

        this.animation_frame = window.requestAnimationFrame(this.run.bind(this));
    }

    stop () {
        this.accumulated_time = 0;
        this.time             = 0;
        window.cancelAnimationFrame(this.animation_frame);
    }
}
