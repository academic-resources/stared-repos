import React from 'react';

class Tile extends React.Component {

  handleClick(event) {
    const flagged = event.altKey
    const { updateGame, tile } = this.props
    updateGame(tile, flagged)
  }
    
  
  render() {
    const {tile} = this.props;

    let code = 'E';
    let klass = 'tile '

    if (tile.flagged) {
      code = '🚩';
      klass += 'flagged'
    } else if (tile.bombed && tile.explored) {
      klass += 'bombed'
      code = '💣'
    } else if (tile.explored) {
      klass += 'explored'
      code = tile.adjacentBombCount();
    }
    
    return (<div onClick={this.handleClick.bind(this)} className={klass}>{code}</div>)
  }
}

export default Tile