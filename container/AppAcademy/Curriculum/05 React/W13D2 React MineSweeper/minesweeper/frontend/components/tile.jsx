import React, {Component} from "react";
import * as Minesweeper from "./minesweeper";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  render() {
    let dispTile;
    let tileClassName = "tile";
    if (this.props.tile.explored) {
      tileClassName += " revealed";
      if (this.props.tile.bombed) {
        dispTile = "💣";
        tileClassName += " bombed";
      } else {
        dispTile = this.props.tile.adjacentBombCount();
        dispTile = dispTile === 0 ? "" : dispTile
      }
    }

    if (this.props.tile.flagged) {
      dispTile = "⚑";
      tileClassName += " flagged";
    }

    return (
      <div className={tileClassName} onClick={this.handleClick}>
        {dispTile}
      </div>
      );
  }

  handleClick(event) {
    const altKeyPressed = event.altKey;

    if (!(this.props.tile.flagged || this.props.tile.explored)) {
      switch (altKeyPressed) {
        case true: 
          this.props.tile.flagged = true;
          break;
        case false:
          this.props.tile.explore();
          break;
      }
    } else if (this.props.tile.flagged && altKeyPressed) {
      this.props.tile.flagged = false;
    }
    this.props.updateGame(this.props.tile);
  }
}

export default Tile;

// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey