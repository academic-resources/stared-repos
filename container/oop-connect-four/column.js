export default class Column {
  constructor() {
    this.tokenArr = Array.from(new Array(6), () => null);
  }

  add(currentPlayer) {
    for (let i = this.tokenArr.length - 1; i >= 0; i--) {
      if (this.tokenArr[i] === null) {
        this.tokenArr[i] = currentPlayer;
        console.log(i);
        break;
      }
    }
  }

  isFull() {
    return !this.tokenArr.includes(null);
  }

  getIndexAt(index) {
    return this.tokenArr[index];
  }
}
