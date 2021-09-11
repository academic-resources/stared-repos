const Game = require('./game')

document.addEventListener("DOMContentLoaded", function () {
    const node = document.getElementById("bird-game");
    const game = new Game(node)

});

