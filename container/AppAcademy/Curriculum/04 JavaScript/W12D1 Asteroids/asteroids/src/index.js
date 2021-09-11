const MovingObject = require("./moving_object.js")
const Asteroid = require("./asteroid.js")
const Util = require("./util.js")
const Game = require("./game.js")
const GameView = require("./game_view.js")
// const Ship = require("./ship.js")

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  // const obj = new MovingObject({ pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"})
  // const obj = new Asteroid([100, 100])
  const game = new GameView(ctx);
  // obj.draw(ctx);
  // game.addAsteroids();
  // console.log("just before start")
  game.start();
  // game.draw(ctx);
  window.game = game;
  window.ctx = ctx;
})

window.MovingObject = MovingObject

// { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}