const Board = require('./board');

const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {

  constructor(player1, player2) {
      this.player1 = player1
      this.player2 = player2
      this.currentPlayer = player1
      this.board = new Board()
  }

  run(reader, completionCB) {
    this.reader = reader
    this.completionCB = completionCB
    this.takeTurn();
    this.takeTurn();

  }

  takeTurn() {
    this.board.render()
    const question = `It is ${this.currentPlayer == this.player1 ? "X" : "O"}'s turn. What is your play?`
    this.reader.question(question, this.handleResponse)
    this.reader.close()
  }

  handleResponse(response) {
    // "0,0"
    position = response.split(',').map(c => parseInt(c))
    this.board.place_mark(position, 'X')
  }
}

g = new Game('rich', 'oli')
g.run(reader, () => {})