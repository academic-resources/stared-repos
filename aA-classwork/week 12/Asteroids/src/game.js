const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");

class Game {
  constructor(dim_x, dim_y, num_asteroids) {
    this.dim_x = dim_x;
    this.dim_y = dim_y;
    this.num_asteroids = num_asteroids;
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Ship({pos: this.randomPosition()});
    this.allObjects = this.allObjects();
    // debugger
  }

  addAsteroids() {
    for (let i = 0; i < this.num_asteroids; i++) {
    //   this.asteroids.push(this.randomPosition());
    this.asteroids.push(new Asteroid({pos: this.randomPosition()}));
    }
  }

  randomPosition() {
    let x = Math.floor((Math.random() * this.dim_x) + 1);
    let y = Math.floor((Math.random() * this.dim_y) + 1);
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 1200, 800);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1200, 800);
    this.allObjects.forEach(object => {
        object.draw(ctx);
    });
  }

  moveObjects() {
    ctx.clearRect(0, 0, 1200, 800);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1200, 800);
    this.allObjects.forEach(object => {
        object.move();
    });
  }

  dist(pos1, pos2) {
      return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2));
  }

  checkCollisions() {
    let isShip = false;
    for (let i = 0; i < this.allObjects.length; i++) {
      for (let j = 0; j < this.allObjects.length; j++) {
        if (this.allObjects[i] instanceof Ship || this.allObjects[j] instanceof Ship) {
            isShip = true;
        }
        if (i !== j) {
            // debugger
          let distance = this.dist(this.allObjects[i].pos, this.allObjects[j].pos);
          let radii = this.allObjects[i].radius + this.allObjects[j].radius;
        //   debugger
          if (distance < radii && isShip) {
            // this.remove(this.allObjects[i], this.allObjects[j]);
            this.ship.pos = this.randomPosition(); 
          }
        }
      }
    }
  }

  step() {
      this.moveObjects();
      this.checkCollisions();
  }

  remove(asteroid1, asteroid2){
      this.asteroids = this.asteroids.filter(el => el !== asteroid1 && el!== asteroid2);
  }

  allObjects() {
    // debugger;
    return this.asteroids.concat(this.ship);
  }

}

module.exports = Game;
