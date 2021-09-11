import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import GameOverModal from './components/modal';
import Header from './components/header';
import Tiles from './components/tiles';
import Game from './game';
import InputHandler from './input';

document.addEventListener('DOMContentLoaded', () => {
  const game = document.getElementById('game');
  ReactDOM.render(<GameContainer/>, game);

  const toggle = document.getElementById('toggle');
  toggle.addEventListener('click', () => {
    const html = document.getElementsByTagName('html')[0];
    html.classList.toggle('dark');
  });
});

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new Game(0),
      modalIsOpen: false
    }
  }

  componentWillMount() {
    Modal.setAppElement(document.getElementById('game'));
  }

  componentDidMount() {
    this.inputHandler = new InputHandler({
      game: this.state.game,
      updateGame: () => this.updateGame(this.state.game)
    });
  }

  updateGame(game) {
    if (game.over()) {
      this.setState({ game });
      setTimeout(() => {
        this.setState({ modalIsOpen: true });
      }, 501);
    } else {
      this.setState({ game });
    }
  }

  resetGame() {
    let game;
    if (this.state.game.score > this.state.game.bestScore) {
      game = new Game(this.state.game.score);
    } else {
      game = new Game(this.state.game.bestScore);
    }
    this.setState({ game, modalIsOpen: false });
    this.inputHandler.update(game);
  }

  getParent () {
    return document.querySelector('.tiles');
  }

  render () {
    return (
      <div className="game-container">
        <GameOverModal
        isOpen={ this.state.modalIsOpen }
        parentSelector={ this.getParent }
        resetGame={ this.resetGame.bind(this) }
        />
        <Header game={ this.state.game } resetGame={ this.resetGame.bind(this) } />
        <Tiles game={ this.state.game } />
      </div>
    );
  }
}
