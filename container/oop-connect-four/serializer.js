export default class Serializer {
  constructor(game) {
    this.game = game;
  }

  serialize() {
    let tokenArray = [];
    let playerNames = [];
    for (let i = 0; i < 7; i++) {
      let column = [];
      for (let j = 0; j < 6; j++) {
        column.push(this.game.getTokenAt(j, i));
      }
      tokenArray.push(column);
    }
    playerNames[0] = this.game.player1;
    playerNames[1] = this.game.player2;
    let jsonString = JSON.stringify([
      tokenArray,
      playerNames,
      this.game.currentPlayer,
      this.game.winnerNumber
    ]);
    localStorage.setItem("gameState", jsonString);
  }
}
