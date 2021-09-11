import React from 'react';
import Modal from 'react-modal'

const GameOverModal = ({ resetGame, parentSelector, isOpen }) => (
  <Modal
  isOpen={ isOpen }
  contentLabel="Modal"
  className="modal-content"
  overlayClassName="modal-overlay"
  parentSelector={ parentSelector }
  >
    <h1>Game over!</h1>
    <button onClick={ resetGame }>Try again</button>
    <nav>
      <ul className="links">
        <li>
          <a href="https://github.com/toddkblake/"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/toddkblake/"><i className="fa fa-linkedin fa-2x" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="http://toddkblake.com/"><i className="fa fa-folder-o fa-2x" aria-hidden="true"></i></a>
        </li>
      </ul>
    </nav>
  </Modal>
);

export default GameOverModal;
