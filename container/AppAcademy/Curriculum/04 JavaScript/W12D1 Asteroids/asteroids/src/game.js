const Asteroid = require('./asteroid.js')
const Ship = require("./ship.js")
const Bullet = require("./bullet.js")


const GAME_CONSTANTS = {
  DIM_X: 640,
  DIM_Y: 480,
  NUM_ASTEROIDS: 7,
  NUM_BULLETS: 2
}

function Game () {
  this.ship = new Ship(this.randomPos(),this);
  this.asteroids = [];
  this.bullets = [];
  this.addAsteroids();
}

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < GAME_CONSTANTS.NUM_ASTEROIDS; i++) {
    this.asteroids.push( new Asteroid(this.randomPos(), this) )

  }
}

Game.prototype.randomPos = function () {
  let x = Math.floor(Math.random() * GAME_CONSTANTS.DIM_X)
  let y = Math.floor(Math.random() * GAME_CONSTANTS.DIM_Y)
  return [x, y]
}

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, GAME_CONSTANTS.DIM_X, GAME_CONSTANTS.DIM_Y);
  this.allObjects().forEach( (a) => {
    a.draw(ctx);
  })
}

Game.prototype.moveObjects = function () {
  this.allObjects().forEach( (a) => {
    a.move();
  })
}

Game.prototype.wrap = function (pos){
  let [x, y] = pos
  if( x > GAME_CONSTANTS.DIM_X ) {
      x -= GAME_CONSTANTS.DIM_X
  } 
  if( y > GAME_CONSTANTS.DIM_Y ) {
      y -= GAME_CONSTANTS.DIM_Y
  }
  if (x < 0) {
      x += GAME_CONSTANTS.DIM_X
  }
  if (y < 0) {
      y += GAME_CONSTANTS.DIM_Y
  }
  return [x, y]
}

Game.prototype.checkCollisions = function () {
  let allObjs = this.allObjects()
  for (let i = 0; i < allObjs.length - 1; i++) {
    for (let j = i + 1; j < allObjs.length; j++) {
      if (allObjs[i].isCollideWith(allObjs[j])) {
        allObjs[i].collideWith(allObjs[j])
        return;
      }
    }
  }
}

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.remove = function (asteroid) {
    idx = this.asteroids.indexOf(asteroid)
    this.asteroids.splice(idx, 1)
}

Game.prototype.allObjects = function () {
    let allObjects = []
    allObjects = allObjects.concat(this.asteroids)
    allObjects = allObjects.concat(this.bullets)
    allObjects.push(this.ship)
    return allObjects
}

Game.prototype.add = function (obj) {
  if (obj instanceof Bullet) this.bullets.push(obj)
  if (obj instanceof Asteroid) this.asteroids.push(obj)
}

module.exports = Game