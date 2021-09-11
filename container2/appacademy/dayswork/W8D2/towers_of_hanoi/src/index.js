const HanoiGame = require('./game');
const HanoiView= require('./view');

$(() => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
