const View = require("./ttt-view.js");
const Game = require("../../solution/game.js");

  $(() => {
    const el = $('.ttt');
    const game = new Game();
    new View(game, el);
  });
