const Level = require("./level.js");
const Bird = require("./bird.js")

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  restart() {
    this.level = new Level(this.canvasWidth, this.canvasHeight)
  }

  animate(context) {
    
  }
}

document.addEventListener("DOMContentLoaded", function(){
const g = new Game(document.getElementById("bird-game"))
});