class Board {
  constructor () {
    this.grid = Array.from({ length: 3 }, (space) => new Array(3) )
    
    this.rows = [
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]]
    ]

    this.cols = [
      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]]
    ]

    this.diags = [
      [[0,0],[1,1],[2,2]],
      [[0,2],[1,1],[2,0]]
    ]
    
    this.dirs = this.rows.concat(this.cols).concat(this.diags)

  }

  getMark(pos) {
    let [x,y] = pos
    return this.grid[x][y]
  }

  place_mark(pos, mark) {
    let [x, y] = pos
    this.grid[x][y] = mark
  }

  getWinningDirs() {
    return this.dirs.filter(dir => this.isWinner(dir))
  }
  won() {
      this.getWinningDirs().length > 0
  }

  isWinner(dir) {
    return (this.getMark(dir[0]) === this.getMark(dir[1])) &&
     (this.getMark(dir[0]) === this.getMark(dir[2]))
  }

  winner() {
    return this.getMark(this.getWinningDirs()[0][0])
  }

  empty(pos) {
    return this.getMark(pos) === undefined
  }

  render() {
      this.rows.map(row => {
          const row_marks = row.map( (pos) => `[${this.getMark(pos) || " "}]`)
          console.log(row_marks.join(" "))
      })
  }

}

module.exports = Board;

// b = new Board()
// b.place_mark( [0,0], 'X')
// b.place_mark( [1,1], 'X')
// b.place_mark( [2,2], 'X')
// b.render();
// console.log(b.grid);
// console.log(b.dirs[6][0]);

// console.log(b.won());
// console.log(b.winner());
// console.log(b.empty([0,2]));
