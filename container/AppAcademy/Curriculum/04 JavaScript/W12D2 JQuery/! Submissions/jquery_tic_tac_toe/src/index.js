const View = require('./ttt-view.js')
const Game = require('./game.js') // require appropriate file

  $(() => {
    const game = new Game();  // Your code here
    const $el = $('.ttt');
    const view = new View(game, $el);  // Your code here
  });
