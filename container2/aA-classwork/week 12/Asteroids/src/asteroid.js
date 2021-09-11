const MovingObject = require("./moving_object.js");
const Util = require("./util.js");

const a = {
    COLOR: "green",
    RADIUS: 10

};


class Asteroid extends MovingObject {
  constructor(options){
    options.color = a.COLOR;
    options.radius = a.RADIUS;
    options.vel = Util.randomVec(3);
    super(options);
  }
}

module.exports = Asteroid;

