import React from "react";
import * as Minesweeper from './minesweeper';
import Tile from "./tile";

class Board extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const rows = this.props.board.grid.map(
      (row, rowIdx) => {
        const tiles = row.map((tile, tileIdx) => {
          return <Tile tile={tile} key={tileIdx} updateGame={this.props.game}/>
        })
        return <div className="row" key={rowIdx}>{tiles}</div>
      }
    )

    return (
      <div className="board">
        {rows}
      </div>
    )
  }
}


export default Board;