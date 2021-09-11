// const MovingObject = require("./moving_object.js");
// const Asteroid = require("./asteroid.js");
// const Game = require("./game.js");
const GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");
  window.ctx = ctx;
  window.ctx.fillStyle = "black";
  window.ctx.fillRect(0, 0, 1200, 800);
  window.gameView = new GameView(ctx);
  window.gameView.start();
}); 



console.log("webpack working!");