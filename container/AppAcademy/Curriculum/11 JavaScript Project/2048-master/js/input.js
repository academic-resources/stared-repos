class InputHandler {
  constructor({ game, updateGame }) {
    this.game = game;
    this.updateGame = updateGame;
    this.bindKeyEvents();
    this.bindTouchEvents();
  }

  bindKeyEvents() {
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case 'ArrowUp': {
          event.preventDefault();
          this.up();
          break;
        }
        case 'ArrowDown': {
          event.preventDefault();
          this.down();
          break;
        }
        case 'ArrowLeft': {
          event.preventDefault();
          this.left();
          break;
        }
        case 'ArrowRight': {
          event.preventDefault();
          this.right();
          break;
        }
      }
    });
  }

  bindTouchEvents(game, updateGame) {
    let startX;
    let startY;
    let endX;
    let endY;

    document.addEventListener('touchstart', event => {
      let touchObj = event.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
    });

    document.addEventListener('touchmove', event => {
      event.preventDefault();
      event.stopPropagation();
    }, { passive: false });

    document.addEventListener('touchend', event => {
      let touchObj = event.changedTouches[0];
      endX = touchObj.pageX;
      endY = touchObj.pageY;

      let dx = endX - startX;
      let dy = endY - startY;

      if (Math.abs(dx) > 25 || Math.abs(dy) > 25) {
        this.handleSwipe(dx, dy);
      }
    });
  }

  handleSwipe(dx, dy) {
    if (Math.abs(dx) > Math.abs(dy)) {
      this.handleHorizontalSwipe(dx);
    } else {
      this.handleVerticalSwipe(dy);
    }
  }

  handleHorizontalSwipe(dx) {
    if (dx > 0) {
      this.right();
    } else {
      this.left();
    }
  }

  handleVerticalSwipe(dy) {
    if (dy > 0) {
      this.down();
    } else {
      this.up();
    }
  }

  up() {
    this.game.move('up');
    this.updateGame();
  }

  down() {
    this.game.move('down');
    this.updateGame();
  }

  left() {
    this.game.move('left');
    this.updateGame();
  }

  right() {
    this.game.move('right');
    this.updateGame();
  }

  update(game) {
    this.game = game;
  }
}

export default InputHandler;
