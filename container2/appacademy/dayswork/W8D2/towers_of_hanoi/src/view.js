class HanoiView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.installHandlers();
    this.timer = setInterval( () => {
        if (this.game.isWon()) {
            alert('You Won!!');
            clearInterval(this.timer);
        }
    }, 500);
  }

  
  setupTowers() {
    for (let i = 0; i < 3; i++) {
      const $ul = $('<ul>');
      $ul.data({ tower_num: i });
      this.$el.append($ul);
      for (let j = 0; j < 3; j++) {
        const $li = $('<li>');
        $li.data({ level: j });
        $ul.append($li);
      }
    }
  }

  render() {
    $('li').attr('class', '');
    this.game.towers.forEach((tower, i) => {
      this.styleTower(tower, i);
    });
  }

  styleTower(tower, tower_idx) {
    let tow = tower.slice().reverse();
    for (let i = 0; i < tow.length; i++) { // 0,1,2
      const disc_num = tow[i];  // 1,2,3
      $($($('ul')[tower_idx]).find('li')[i]).addClass(`disc-${disc_num}`);
    }
  }

  installHandlers() {
    const $ul = $('ul');

    $ul.click((event) => {
      
      if (this.tower_clicked || this.tower_clicked === 0) {
        const destination = $(event.currentTarget).data('tower_num');

        if (!this.game.isValidMove(this.tower_clicked, destination)) {
            alert('Invalid Move');
            return;
        }
        $('li').removeClass('selected');
        this.game.move(this.tower_clicked, destination);
        this.tower_clicked = undefined;
        this.render();
      } else {
        $('li').removeClass('selected');
        this.tower_clicked = $(event.currentTarget).data('tower_num');
        $(event.currentTarget).children().first().toggleClass('selected');
      }
    });
  }



}

module.exports = HanoiView;