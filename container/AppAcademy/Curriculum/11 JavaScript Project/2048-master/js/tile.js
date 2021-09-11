let id = 0;

class Tile {
  constructor(pos, value) {
    this.row = pos[0];
    this.col = pos[1];
    this.value = value;
    this.merged = false;
    this.id = id++
  }

  updatePos(pos) {
    this.row = pos[0];
    this.col = pos[1]
  }

  updateVal(value){
    this.value = value;
  }
}

export default Tile;
