# Dr Mario JS

[Dr Mario JS](https://swangs.github.io/drmariojs/) is a web browser puzzle game inspired by Dr Mario.  It is built entirely with vanilla JavaScript and HTML5.

## How to Play
Create rows and columns of four or more matching colors. Destroy all viruses to advance to the next level.  

![alt text](https://i.imgur.com/bmdvYwD.gif "drmariodemo")

## Features
9 levels with increasing difficulty

Engineered with object oriented programming in mind; key objects and functions are bundled together with Webpack

2D Array Grid and Canvas Element synced to provide foundations for game animation and mechanics.
```javascript
newBoard(ctx) {
  const board = new Array(16);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(8);
  }
  this.randomizeViruses(ctx, board);
  return board;
}

draw(ctx) {
  if (!this.paused && !this.gameOver) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach((object) => {
      if (object !== undefined) {
        object.draw();
      }
    });
  }
}
```
