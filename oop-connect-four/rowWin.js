export default class RowWinInspector {
  constructor([col1, col2, col3, col4]) {
    this.col1 = col1.tokenArr;
    this.col2 = col2.tokenArr;
    this.col3 = col3.tokenArr;
    this.col4 = col4.tokenArr;
  }

  inspect() {
    for (let i = 0; i < 6; i++) {
      if (
        this.col1[i] === this.col2[i] &&
        this.col1[i] === this.col3[i] &&
        this.col1[i] === this.col4[i] &&
        this.col1[i] !== null
      ) {
        return this.col1[i];
      }
    }
  }
}
