function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.DIRS = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0]
};

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  this.lastTime = Date.now();

  requestAnimationFrame(() => {
    this.animate.call(this, Date.now());
  });
};

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  const ship = this.game.ship;
  Object.keys(GameView.DIRS).forEach(function(button){
    const dir = GameView.DIRS[button];
    key(button, function () {
      ship.power(dir);
    });
  });
  key("space", function() {
    ship.fireBullet();
  });
};

GameView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;

  requestAnimationFrame( () => {
    this.animate.call(this, Date.now());
  });
  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;


};

module.exports = GameView;