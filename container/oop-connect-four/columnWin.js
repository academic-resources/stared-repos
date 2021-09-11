export default class ColumnWinInspector {
  constructor(columns) {
    this.columns = columns;
  }
  inspect() {
    for (let i = 0; i < 4; i++) {
      if (
        this.columns[i] === this.columns[i + 1] &&
        this.columns[i] === this.columns[i + 2] &&
        this.columns[i] === this.columns[i + 3] &&
        this.columns[i] !== null
      ) {
        console.log(this.columns[i]);
        return this.columns[i];
      }
    }
  }
}
