const View = require('./ttt-view.js');
const Game = require('../../ttt_solution/game.js.js');

  $(() => {
    const game = new Game();
    const $container = $('.ttt');
    const view = new View(game, $container);
  });
