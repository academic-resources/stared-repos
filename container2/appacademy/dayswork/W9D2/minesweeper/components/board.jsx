import React from 'react';
import Tile from './tile'

class Board extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    const {board: { grid }, updateGame} = this.props

    return(
      <div className='board'>
        {grid.map( (row, idx) => (<div key={idx}>
          {row.map((tile, idx2) => (<Tile key={idx2} tile={tile} updateGame={updateGame} />))}
          </div>))}
      </div>
    )
  }
}

export default Board