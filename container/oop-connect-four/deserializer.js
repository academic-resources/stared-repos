export default class Deserializer {
  constructor() {
    this.tokenArray = [];
    this.playerNames = [];
    this.currentPlayer = "";
    this.winnerNumber = undefined;
  }

  deserialize() {
    let jsonString = localStorage.getItem("gameState");
    let storage = JSON.parse(jsonString);
    if (storage !== null) {
      this.tokenArray = storage[0];
      this.playerNames = storage[1];
      this.currentPlayer = storage[2];
      this.winnerNumber = storage[3];
    }
  }
}
