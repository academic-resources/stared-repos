const Game = require("./game.js");

class MovingObject {
    constructor(options){
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.color = options.color;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.stroke();
      ctx.fill();
    }

    move() {
        // this.pos[0] += this.vel[0];
        // this.pos[1] += this.vel[1];
        this.pos[0] += this.vel[0];
        this.pos[0] = this.pos[0] % 1200;
        this.pos[1] += this.vel[1];
        this.pos[1] = this.pos[1] % 800;
        this.draw(ctx);
    }

    isCollidedWith(otherObject) {
      let distance = this.dist(this.pos, otherObject.pos);
      let radii = this.radius + otherObject.radius;
      return (distance < radii);
    }

    dist(pos1, pos2) {
      return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2));
    }

    collideWith(otherObject) {
      
    }
}

module.exports = MovingObject;