class View {
  constructor(game, $el) {
    this.game = game;
    this.$container = $el;
    this.$container.append(this.setupBoard());
    this.bindEvents();
    this.timer = setInterval(this.showAlert.bind(this), 500);
  }

  showAlert() {
    if (this.game.winner()) {
      alert(`${this.game.currentPlayer} Wins!!`);
      clearInterval(this.timer);
    }
  }

  bindEvents() {
    $('ul').on('click', 'li', (event) => {
      const pos = $(event.currentTarget).data('pos');
      this.game.playMove(pos);
      this.makeMove($(event.currentTarget));
    });
    
  }

  makeMove($square) {
    const mark = this.game.currentPlayer;
    const color = (mark === 'x' ? 'pink_x' : 'blue_o');
    $square.text(mark).addClass("occupied").addClass(color);
  }

  setupBoard() {
    const $ul = $('<ul>');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const $li = $('<li>');
        $li.data({pos: [i, j]});
        $ul.append($li);  
      }
    }
    return $ul;
  }
}

module.exports = View;
