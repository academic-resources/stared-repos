import React from 'react';

const Tile = ({ tile }) => {
  const merged = tile.merged ? 'merged' : '';
  return (
    <div className={ `tile pos-${tile.row}-${tile.col} value-${tile.value} ${ merged }` }>
      <span>{ tile.value }</span>
    </div>
  );
}

export default Tile;
