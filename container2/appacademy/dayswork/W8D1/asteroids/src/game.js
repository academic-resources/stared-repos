/* eslint-disable no-console */
/* eslint-disable no-undef */
const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Game () {
  this.asteroids = [];
  this.addAsteroids();
  this.bullets = [];
  let shipPos = this.randomPosition();
  this.ship = new Ship(shipPos, this);
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 20;

Game.prototype.addAsteroids = function() {
  for (let i = 0; i <= Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.randomPosition = function () {
  let x = Math.random() * Game.DIM_X;
  let y = Math.random() * Game.DIM_Y;
  return [x,y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach((a) => {
    a.draw(ctx);
  });
};

Game.prototype.move = function () {
  this.allObjects().forEach((a) => {
    a.move();
  });
};

Game.prototype.wrap = function (pos) {
  if (pos[0] < 0) {
    pos[0] = Game.DIM_X;
  }
  if (pos[0] > Game.DIM_X) {
    pos[0] = 0;
  }
  if (pos[1] < 0) {
    pos[1] = Game.DIM_Y;
  }
  if (pos[0] > Game.DIM_Y) {
    pos[0] = 0;
  }
  return pos;
};

Game.prototype.checkCollisions = function() {
    // this.asteroids.forEach( (a, idx1) => {
    //     this.asteroids.forEach( (b, idx2) => {
    //         if (idx1 !== idx2) {
    //             if (a.isCollidedWith(b)) {
    //                 a.collideWith(b);
    //             }
    //         }
    //     });
    // });
    const allObjects = this.allObjects()
    for (let i = allObjects.length - 1; i >= 0; i--) {
      for (let j = allObjects.length - 1; j >= 0; j--) {
        if (i !== j) {
          let a = allObjects[i];
          let b = allObjects[j];
          if (a.isCollidedWith(b)) {
            a.collideWith(b);
          }
        }
      }
    }
};

Game.prototype.step = function () {
  this.move();
  this.checkCollisions();
};

Game.prototype.remove = function(obj) {
    if (obj instanceof Bullet) {
      this.bullets = this.bullets.filter( b => b !== obj);
    } else {
        this.asteroids = this.asteroids.filter( a => a !== obj );
    }
    delete obj;
};

Game.prototype.allObjects = function() {
    let results = this.asteroids.slice()
    results.push(this.ship);
    results = results.concat(this.bullets);
    return results;
};

Game.prototype.add = function (obj) {
  if (obj instanceof Bullet) {
    this.bullets.push(obj);
  } else {
    this.asteroids.push(obj);
  }
};

module.exports = Game;