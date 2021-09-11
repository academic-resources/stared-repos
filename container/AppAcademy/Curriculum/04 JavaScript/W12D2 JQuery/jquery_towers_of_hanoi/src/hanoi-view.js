class View {
  constructor (game, $el) {
    this.game = game;
    this.$el = $el;
    this.currentTower;
    this.setupTowers();
    this.render();
    this.clickTower();

    }

  setupTowers() {
    for (let tower = 0; tower < 3; tower++) {
      const $tower = $('<ul>');
      for (let pos = 0; pos < 3; pos++) {
        const $pos = $('<li>');
        $tower.append($pos);
      }
      $('figure').append($tower);
    }
  }

  render() {

  }

  clickTower() {
    const $figure = $('figure');
    $figure.on('click', 'ul', (event) => {
      const clickedUl = event.currentTarget;
      const $clicked = $(clickedUl);
      this.currentTower = $clicked.index();
      if (this.currentTower !== undefined) {
        const otherTower = $clicked.index();
        this.game.move(this.currentTower, otherTower);
        console.log(this.currentTower);
        console.log(otherTower);
        
        
        this.currentTower = undefined;
        console.log(this.currentTower);
      }
    });


  }
}


module.exports = View