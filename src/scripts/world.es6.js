'use strict';

class Rectangle {

    constructor(x, y, width, height) {
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.width;
    }

    get top() {
        return this.y;
    }

    get bottom() {
        return this.y + this.height;
    }

    set left (val) {
        this.x = val;
    }

    set right (val) {
        this.x = val  - this.width;
    }

    set top (val) {
        this.y = val;
    }

    set bottom (val) {
        this.y = val - this.height;
    }
}

export class World extends Rectangle {

    constructor(width, height) {
        super(0, 0, width, height);
        this.friction = .9;
        this.gravity  = 3;
        this.player   = new Player(30, 80, 12, 16);
    }



    collide (object) {
        if (object.left < this.left) {
            object.left = this.left;
            object.velocity_x = 0;
        }
        else if (object.right > this.right) {
            object.right = this.right;
            object.velocity_x = 0;
        }
        if (object.top < this.top) {
            object.top = this.top;
            object.velocity_y = 0;
        }
        else if (object.bottom > this.bottom) {
            object.bottom = this.bottom;
            object.velocity_y = 0;
        }
    }

    update () {
        this.player.velocity_y += this.gravity;
        this.player.update();
        this.player.velocity_y *= this.friction;
        this.player.velocity_x *= this.friction;
        this.collide(this.player);
    }

}



class Player extends Rectangle {

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.jumping  = false;
    }

    //clamp the velocities to avoid tunneling
    set vel_x (vel_x) {
        if (vel_x > 0)
            this.velocity_x = Math.min(vel_x, 14);
        else
            this.velocity_x = Math.max(vel_x, -14);
    }

    set vel_y (vel_y) {
        if (vel_y > 0)
            this.velocity_y = Math.min(vel_y, 14);
        else
            this.velocity_y = Math.max(vel_y, -14);
    }

    get vel_x () {
        return this.velocity_x;
    }

    get vel_y () {
        return this.velocity_y;
    }

    update() {
        this.x += this.vel_x;
        this.y += this.vel_y;
    }

    moveLeft() {
        this.vel_x += 0.5;
    }

    moveRight() {
        this.vel_x -= 0.5;
    }

    jump() {
        if (!this.jumping) {
            this.vel_y += 20;
            this.jumping = true;
        }
    }
}
