const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

function Game() {
  this.asteroids = [];
  this.bullets = [];
  this.ship = new Ship({pos: this.randomPosition(), game: this});

  this.addAsteroids();
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 6;
Game.BACKGROUND = new Image();
Game.BACKGROUND.src = './img/galaxy.jpg';

Game.prototype.add = function add(obj) {
  if (obj instanceof Asteroid) {
    this.asteroids.push(obj);
  } else {
    this.bullets.push(obj);
  }
};

Game.prototype.addAsteroids = function addAsteroids() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    const randPos = this.randomPosition();
    this.add(new Asteroid({pos: randPos, game: this}));
  }
};

Game.prototype.randomPosition = function randomPosition() {
  return [Math.floor(Math.random() * (Game.DIM_X + 1)), Math.floor(Math.random() * (Game.DIM_Y + 1))];
};

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.drawImage(Game.BACKGROUND, 0, 0);
  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function moveObjects(timeDelta) {
  this.allObjects().forEach(function(object) {
    object.move(timeDelta);
  });
};

Game.prototype.wrap = function wrap(pos) {
  return [((pos[0] + Game.DIM_X) % Game.DIM_X), (pos[1] + Game.DIM_Y) % Game.DIM_Y];
};

Game.prototype.checkCollisions = function checkCollisions() {
  const objects = this.allObjects();
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      const obj1 = objects[i];
      const obj2 = objects[j];
      if ( obj1.isCollidedWith(obj2) ){
        const collided = obj1.collideWith(obj2);
        if (collided) break;
      }
    }
  }
};

Game.prototype.step = function step() {
  this.moveObjects();
  this.checkCollisions();
  if (this.asteroids.length === 0) this.addAsteroids();
};

Game.prototype.remove = function remove(obj) {
  if (obj instanceof Asteroid) {
    const index = this.asteroids.indexOf(obj);
    this.asteroids.splice(index);
  } else {
    const index = this.bullets.indexOf(obj);
    this.bullets.splice(index);
  }
};

Game.prototype.allObjects = function allObjects() {
  return [].concat([this.ship], this.asteroids, this.bullets);
};

Game.prototype.isOutOfBounds = function isOutOfBounds(pos) {
  return (pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y);
};

module.exports = Game;