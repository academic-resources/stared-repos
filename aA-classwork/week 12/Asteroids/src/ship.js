const MovingObject = require("./moving_object.js");
const Game = require("./game.js");

const s = {
    COLOR: "yellow",
    RADIUS: 25

};

class Ship extends MovingObject {
    constructor(options) {
        options.color = s.COLOR;
        options.radius = s.RADIUS;
        options.vel = [0, 0];
        super(options);
    }

    // relocate() {
    //     let newPos = game.randomPosition();
    //     this.pos = newPos; 
    // }

    power(impulse) {
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
    }

   
}

module.exports = Ship;