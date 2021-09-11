class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    const $ul = $('ul');
    $ul.on("click", "li", (event) => {
      const $clickedLi = $(event.currentTarget);
      this.makeMove($clickedLi)
      // assign current player
    })
  }
  
  makeMove($clickedLi) {
    const pos = $clickedLi.data('pos')
    if (this.game.board.isEmptyPos(pos)) {
      this.game.playMove(pos)
      $clickedLi.addClass('current-players-mark');
      const mark = this.game.board.grid[pos[0]][pos[1]];
      $clickedLi.text(mark);
    } else {
      alert('Invalid move! Try again.')
    }

    if (this.game.isOver()) {
      const mark = this.game.board.grid[pos[0]][pos[1]];
      const winner = this.game.winner();
      const $figCaption = $('<figcaption>');
      $figCaption.addClass('fig-caption');
      $figCaption.text(`You win, ${mark}!`);
      $('body').append($figCaption);
      const $li = $();
      $('ul').off('click', 'li');
    }
  }

  setupBoard() {
    const $ul = $('<ul>');
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const $li = $('<li>');
        $li.data('pos', [row, col]);
        $ul.append($li);
      }
    }
    const $body = $('body');
    $body.append($ul);
  }
}

module.exports = View;
