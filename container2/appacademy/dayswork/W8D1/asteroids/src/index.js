/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/* eslint-disable no-console */
const MovingObject = require("./moving_object.js");
const Asteroid = require("./asteroid.js");
const Game = require("./game.js");
const GameView = require("./game_view.js");

console.log('Webpack is working');

window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Game = Game;
window.GameView = GameView;

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  window.ctx = ctx;

  let gv = new GameView(ctx);
  
  gv.start();
});