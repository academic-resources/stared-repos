class Grid {
  constructor() {
    this.grid = this.emptyGrid();
    this.movePoints = 0;
    this.vectors = {
      'up': [-1, 0],
      'down': [1, 0],
      'left': [0, -1],
      'right': [0, 1]
    }
  }

  emptyGrid() {
    const grid = []
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        row.push(null);
      }
      grid.push(row);
    }
    return grid;
  }

  getTile(pos) {
    let row;
    let col;
    [row, col] = pos;
    return this.grid[row][col];
  }

  setTile(tile) {
    this.grid[tile.row][tile.col] = tile;
  }

  removeTile(tile) {
    this.grid[tile.row][tile.col] = null;
  }

  eachPos(callback) {
    this.grid.forEach((row, x) => {
      row.forEach((tile, y) => {
        callback(tile, x, y);
      });
    });
  }

  // if direction is down, it should iterate grid backwards
  eachPosDown(callback) {
    for (let i = 3; i >= 0; i--) {
      let row = this.grid[i];
      row.forEach((tile) => {
        callback(tile);
      });
    }

  }

  // if direction is right, it should iterate rows backwards
  eachPosRight(callback) {
    this.grid.forEach((row) => {
      for (let i = 3; i >= 0; i--) {
        let tile = row[i];
        callback(tile);
      }
    });
  }

  sortedTiles() {
    const tiles = [];
    this.eachPos((tile) => {
      if (tile) {
        tiles.push(tile);
      }
    });
    tiles.sort(this.sortByTileId);
    return tiles;
  }

  sortByTileId(tileA, tileB) {
    if (tileA.id < tileB.id) {
      return -1;
    } else if (tileA.id > tileB.id) {
      return 1;
    } else {
      return 0;
    }
  }

  emptyPositions() {
    const emptyPositions = [];
    this.grid.forEach((row, rowIdx) => {
      row.forEach((tile, colIdx) => {
        if (!tile) {
          emptyPositions.push([rowIdx, colIdx]);
        }
      });
    });
    return emptyPositions;
  }

  randomEmptyPosition() {
    const emptyPositions = this.emptyPositions();
    return emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  }

  inBounds(pos) {
    let row = pos[0];
    let col = pos[1];
    return (row >= 0 && row < 4 && col >= 0 && col < 4);
  }

  empty(pos) {
    let row = pos[0];
    let col = pos[1];
    return (this.grid[row][col] === null);
  }

  equalValue(pos, tile) {
    let row = pos[0];
    let col = pos[1];
    return (this.grid[row][col].value === tile.value);
  }

  updateTilePositions() {
    this.eachPos((tile, x, y) => {
      tile.updatePos([x, y]);
    });
  }

  resetMergedTiles() {
    this.eachPos((tile) => {
      if (tile) {
        tile.merged = false
      }
    });
  }

  resetMovePoints() {
    this.movePoints = 0;
  }

  determineEnumerator(dir){
    let enumerator;

    if (dir === 'down') {
      enumerator = this.eachPosDown.bind(this);
    } else if (dir === 'right') {
      enumerator = this.eachPosRight.bind(this);
    } else {
      enumerator = this.eachPos.bind(this);
    }

    return enumerator;
  }

  move(dir) {
    this.resetMovePoints();
    this.resetMergedTiles();
    const vector = this.vectors[dir];

    const dx = vector[0];
    const dy = vector[1];
    const enumerator = this.determineEnumerator(dir);

    enumerator((tile) => {
      if (tile) {
        while(this.inBounds([tile.row + dx, tile.col + dy])) {

          if (this.empty([tile.row + dx, tile.col + dy])) {

            // move tile into empty space
            this.removeTile(tile);
            tile.updatePos([tile.row + dx, tile.col + dy]);
            this.setTile(tile);

          } else if (this.equalValue([tile.row + dx, tile.col + dy], tile)
            && !this.grid[tile.row + dx][tile.col + dy].merged) {

            // merge tiles
            tile.merged = true;
            this.removeTile(tile);
            tile.updatePos([tile.row + dx, tile.col + dy]);
            tile.updateVal(tile.value * 2);
            this.setTile(tile);
            this.movePoints += tile.value;

            break;
          } else {
            break;
          }
        }
      }
    });
  }

  availableMerges() {
    let availableMerges = false;
    this.eachPos((tile)=> {
      if (this.neighboringMerge(tile)) {
        availableMerges = true;
      }
    });
    return availableMerges;
  }

  neighboringMerge(tile) {
    let neighboringMerge = false;

    Object.values(this.vectors).forEach((vector) => {
      let dx = vector[0];
      let dy = vector[1];

      if (this.inBounds([tile.row + dx, tile.col + dy])) {
        const neighboringTile = this.grid[tile.row + dx][tile.col + dy];
        if (neighboringTile.value === tile.value) {
          neighboringMerge = true;
        }
      }

    });

    return neighboringMerge;
  }
}

export default Grid;
