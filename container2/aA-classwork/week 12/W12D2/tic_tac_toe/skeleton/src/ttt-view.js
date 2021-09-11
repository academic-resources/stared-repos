class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    const $ul = $('ul');
    $ul.on('click', 'li', (event) => {
      const $clicked = $(event.currentTarget);
      // $clicked.css('background-color', 'purple');
      console.log(this.game);
      this.makeMove($clicked);
    });
  }

  makeMove($square) {
    // debugger
    const pos = $square.attr('pos').split(',');
    this.game.playMove(pos);
    if (this.game.currentPlayer == 'x') {
      $square.css('color', 'purple');
    }
    $square.text(this.game.currentPlayer);
    $square.css('background-color', 'white');

    if (this.game.isOver()) {
      const $ul = $('ul');
      $ul.off('click');
      const winner = this.game.currentPlayer === 'x' ? 'X' : 'O';
      const $h1 = $('<h1>');
      if (this.game.winner()) {
        $h1.text(`${winner} Wins!`);
      } else $h1.text("It's a tie!");
      this.$el.append($h1);
    }
  }
  
  setupBoard() {
    const $ul = $('<ul>');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let $li = $('<li>');
        $li.attr('pos', [i, j]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
