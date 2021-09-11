import Game from "./game.js";
import Deserializer from "./deserializer.js";
import Serializer from "./serializer.js";

const gameBoard = document.getElementById("board-holder");
const clickTargets = document.getElementById("click-targets");
const textArea = document.getElementById("game-name");
let squaresObj = undefined;
let game = undefined;
let gameStarted = false;

let columnObj = {
  0: 5,
  1: 5,
  2: 5,
  3: 5,
  4: 5,
  5: 5,
  6: 5,
};

const checkAllSquares = () => {
  for (let key in game.board) {
    if (game.board[key] !== null) {
      let square = document.getElementById(key);
      if (game.board[key] === 1) {
        console.log("hello");
        let tokenDiv = document.createElement("div");
        tokenDiv.classList.add("token", "red");
        square.appendChild(tokenDiv);
        break;
      } else if (game.board[key] === 2) {
        let tokenDiv = document.createElement("div");
        tokenDiv.classList.add("token", "black");
        square.appendChild(tokenDiv);
        break;
      }
    }
  }
};

const changePlayerColor = () => {
  let currentPlayer = game.currentPlayer;
  currentPlayer === 1
    ? (clickTargets.classList.remove("black"),
      clickTargets.classList.add("red"))
    : (clickTargets.classList.remove("red"),
      clickTargets.classList.add("black"));
};

const handlePlayerMove = (index, invalidMove) => {
  !invalidMove
    ? changePlayerColor()
    : document.getElementById(`column-${index}`).classList.add("full");
};

const revealBoard = () => {
  game === undefined
    ? gameBoard.classList.add("is-invisible")
    : (gameBoard.classList.remove("is-invisible"),
      (textArea.innerHTML = `<h1>${game.getName()}</h1>`));
};

const displayWinOrMove = (index, invalidMove) => {
  index === undefined || game.winnerNumber !== 0
    ? revealBoard(index, invalidMove)
    : ((invalidMove = game.isColumnFull(index)),
      handlePlayerMove(index, invalidMove));
};

const updateUI = (index) => {
  let invalidMove = false;
  if (gameStarted) {
    checkAllSquares();
  }
  displayWinOrMove(index, invalidMove);
};

const findColumnIndex = (rowIndex) => {
  let index = columnObj[rowIndex];
  columnObj[rowIndex] -= 1;
  console.log(columnObj[rowIndex]);
  return index;
};

window.addEventListener("DOMContentLoaded", () => {
  const P1 = document.getElementById("player-1-name");
  const P2 = document.getElementById("player-2-name");
  const newGameButton = document.getElementById("new-game");

  const disableNewGameButton = () => {
    newGameButton.disabled = P1.value === "" && P2.value === "" ? true : false;
  };

  P1.addEventListener("keyup", () => disableNewGameButton());
  P2.addEventListener("keyup", () => disableNewGameButton());

  newGameButton.addEventListener("click", () => {
    game = new Game(P1.value, P2.value);
    console.log(game.board);
    P1.value = "";
    P2.value = "";
    newGameButton.disabled = true;
    game.board.makeBoard(game);
    updateUI();
  });

  clickTargets.addEventListener("click", (event) => {
    if (game.winnerNumber !== 0) return;

    let element = event.target.id;
    if (!element.startsWith("column-")) return;
    let rowIndex = Number.parseInt(element[element.length - 1]);
    let columnIndex = findColumnIndex(rowIndex);

    game.takePlayerTurn(rowIndex, columnIndex);
    updateUI(rowIndex);
  });
});
