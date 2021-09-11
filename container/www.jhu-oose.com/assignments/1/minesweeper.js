var minesweeper = {
	
  cellWidth:			16, // pixel width of cell image in sprite - used to calculate minefield width
  levels: {
      beginner: {
    id: 1,
          rows: 9,
          cols: 9,
          mines: 10
      },
      intermediate: {
    id: 2,
          rows: 16,
          cols: 16,
          mines: 40
      },
      expert: {
    id: 3,
          rows: 16,
          cols: 30,
          mines: 99
      }
  },
minCustomRows:		1,
minCustomCols:		7,
maxCustomRows:		50,
maxCustomCols:		50,
  defaultLevel:       'beginner',
  currentLevel:       null,
  numRows:            null, // number of visible rows
  numCols:            null, // number of visible columns
  numMines:           null,
  mineCount:          null,
  numCells:           null, // total number of visible cells
  numRowsActual:      null, // 2 more than visible rows to add extra invisible surrounding cell layer to 
  numColsActual:      null, //    board. This avoids the need to check for boundaries in recursive revealCell method
  target:             null, // target where game board goes into (defaults to body if none supplied in init())
  cells:              [], // array of cell objects
  safeCells:          [], // array of cells without mines
  mineCells:          [], // array of cells with mines
  flagStates:         [ 'covered', 'flag', 'question' ], // right click states for covered cells
  numFlagStates:      null,
  includeMarks:       true,
  madeFirstClick:     false,
  stopTimerID:        0, // used to cancel setTimeout used for timer
  timer:              0,
  gameInProgress:     false,
won:				false,
  mouseDown:          false,
  gameInitialized:    false,
  customDialogOpen:   false,
  
  /* DOM elements */
  $windowWrapperOuter:    null,
  $resetButton:           null,
  $mineCountOnes:         null,
  $mineCountTens:         null,
  $mineCountHundreds:     null,
  $timerOnes:             null,
  $timerTens:             null,
  $timerHundreds:         null,
  $minefield:             null,
                          
//-----------------------------------
  
  init: function( targetID ) {
      var self = this;
      
      // set vars that are dependant on other object vars
      this.target = targetID ? '#' + targetID : 'body';
      this.numFlagStates = self.flagStates.length;
      
  
  //'<div id="high-score-dialog" class="window-wrapper-outer"><div class="window-wrapper-inner"><div class="window-container"><p><label>Name:</label><input type="text" id="high-score-name" /><input type="button" value="Submit" id="submit-high-score" /></p></div></div></div>'
  
      // DOM creation
      $(this.target).append('<div id="game-container"><div id="custom-level-dialog" class="window-wrapper-outer"><div class="window-wrapper-inner"><div class="window-container"><div id="custom-title-bar" class="title-bar"></div><div id="custom-dialog-content"><div id="minesweeper-custom-fields"><p><label>Height:</label><input type="text" id="minesweeper-custom-height" class="form-textbox"></p><p><label>Width:</label><input type="text" id="minesweeper-custom-width" class="form-textbox"></p><p><label>Mines:</label><input type="text" id="minesweeper-custom-mines" class="form-textbox"></p></div><div id="minesweeper-custom-buttons"><input type="button" value="OK" id="minesweeper-ok-btn" class="form-button" /><input type="button" value="Cancel" id="minesweeper-cancel-btn" class="form-button" /></div></div></div></div></div><div id="high-score-dialog" class="window-wrapper-outer"><div class="window-wrapper-inner"><div class="window-container"><div id="high-score-dialog-content"><h2>High score!</h2></p><p><label id="high-score-name-label">Name:</label><input type="text" id="high-score-name-textbox" class="form-textbox" maxlength="20" /></p><p id="submit-high-score-container"><input type="button" value="Submit High Score" id="submit-high-score" class="form-button" /></p></div></div></div></div><div id="window-wrapper-outer" class="window-wrapper-outer"><div class="window-wrapper-inner"><div class="window-container"><div id="minesweeper-title-bar" class="title-bar"></div><div id="menu-link-container"><a id="menu-link" href="#">Game</a></div><div id="minesweeper-board-wrapper"><ul id="menu"><li id="menu-new">New</li><li class="menu-divider"></li><li id="menu-beginner" class="game-level checked">Beginner</li><li id="menu-intermediate" class="game-level">Intermediate</li><li id="menu-expert" class="game-level">Expert</li><li id="menu-custom" class="game-level">Custom…</li><li class="menu-divider"></li><li id="menu-marks" class="checked">Marks (?)</li></ul><div id="minesweeper-header-wrapper"><div id="minesweeper-header-container"><div id="minesweeper-header"><div id="mine-count" class="numbers"><div id="mine-count-hundreds" class="t0"></div><div id="mine-count-tens" class="t1"></div><div id="mine-count-ones" class="t0"></div></div><div id="minesweeper-reset-button" class="face-smile"></div><div id="timer" class="numbers"><div id="timer-hundreds" class="t0"></div><div id="timer-tens" class="t0"></div><div id="timer-ones" class="t0"></div></div></div></div></div><div id="minefield"></div></div></div></div></div></div>');

      // capture special DOM elements that will be used
      this.$windowWrapperOuter =  $('#window-wrapper-outer');
      this.$resetButton =         $('#minesweeper-reset-button');
      this.$mineCountOnes =       $('#mine-count-ones');
      this.$mineCountTens =       $('#mine-count-tens');
      this.$mineCountHundreds =   $('#mine-count-hundreds');
      this.$timerOnes =           $('#timer-ones');
      this.$timerTens =           $('#timer-tens');
      this.$timerHundreds =       $('#timer-hundreds');
      this.$minefield =           $('#minefield');
      
      var $menu =             $('#menu'),
          $menuLink =         $('#menu-link'),
          $menuNewGame =      $('#menu-new'),
          $menuBeginner =     $('#menu-beginner'),
          $menuIntermediate = $('#menu-intermediate'),
          $menuExpert =       $('#menu-expert'),
          $menuCustom =       $('#menu-custom'),
          $menuMarks =        $('#menu-marks'),
          $customDialog =     $('#custom-level-dialog'),
          $customWidthTxt =   $('#minesweeper-custom-width'),
          $customHeightTxt =  $('#minesweeper-custom-height'),
          $customMinesTxt =   $('#minesweeper-custom-mines'),
          $customOKBtn =      $('#minesweeper-ok-btn'),
          $customCancelBtn =  $('#minesweeper-cancel-btn');
      
      /* BEGIN menu events */        
      $(document.body).click(function(e){
          if ( !self.customDialogOpen ) {
              $menu.hide();
              $menuLink.removeClass('active');
          }
      });
      
      // combine all elements that when clicked should not hide menu
      var $menuRelated = $menu.add( $menuLink ).add( $customDialog );
      
      // prevent clicks on menu related elements from hiding menu
      $menuRelated.bind('click', function(e) {
          e.stopPropagation();
      });
      
      // "Game" link toggles menu
      $menuLink.bind('click', function(e) {
          $(this).toggleClass('active');
          $menu.toggle();
      });
      
      $menuNewGame.bind('click', function() {
          self.reset();
          $menu.hide();
          $menuLink.removeClass('active');
      });
      
      $menuBeginner.bind('click', function() {
          $('.game-level').removeClass('checked');
          $(this).addClass('checked');        
          self.newGame( 'beginner' );
          $menu.hide();
          $menuLink.removeClass('active');
      });
      
      $menuIntermediate.bind('click', function() {
          $('.game-level').removeClass('checked');
          $(this).addClass('checked');
          self.newGame( 'intermediate' );
          $menu.hide();
          $menuLink.removeClass('active');
  });
      
      $menuExpert.bind('click', function() {
          $('.game-level').removeClass('checked');
          $(this).addClass('checked');
          self.newGame( 'expert' );
          $menu.hide();
          $menuLink.removeClass('active');
      });
      
      $menuCustom.bind('click', function() {
          $customDialog.show();
          self.customDialogOpen = true;
      });
  
      $menuMarks.bind('click', function() {
          $(this).toggleClass('checked');
          self.toggleMarks();
          $menu.hide();
          $menuLink.removeClass('active');
      });
      /* END menu events */        
      
      
      /* BEGIN custom dialog events */
      // set field defaults
      $customHeightTxt.val( this.levels[ this.defaultLevel ].rows );
      $customWidthTxt.val( this.levels[ this.defaultLevel ].cols );
      $customMinesTxt.val( this.levels[ this.defaultLevel ].mines );
  
  $intChecks = $customWidthTxt.add( $customHeightTxt ).add( $customMinesTxt );
  $intChecks.bind('keyup', function() {
    if (!/^\d+$/.test( $(this).val() ) ) {
      $(this).val('');
    }
  });
      
      $customOKBtn.bind('click', function() {
          // set custom menu item to checked
          $('.game-level').removeClass('checked');
          $menuCustom.addClass('checked');
          
          // hide custom dialog
          $customDialog.hide();
          self.customDialogOpen = false;
          
          // hide menu
          $menu.hide();
          $menuLink.removeClass('active');
          
          /* set new game based on field inputs */
          var rowsVal = +$customHeightTxt.val(),
      colsVal = +$customWidthTxt.val(),
      minesVal = +$customMinesTxt.val(),
      rows = rowsVal < self.minCustomRows ? self.minCustomRows : (rowsVal > self.maxCustomRows ? self.maxCustomRows : rowsVal),
              cols = colsVal < self.minCustomCols ? self.minCustomCols : (colsVal > self.maxCustomCols ? self.maxCustomCols : rowsVal),
              minMines = 1,
      maxMines = Math.floor( (rows * cols) * 2/3 ),
      mines = minesVal < minMines ? minMines : (minesVal > maxMines ? maxMines : minesVal);
      if (mines > 999) mines = 999;
      
    $customHeightTxt.val(rows);
    $customWidthTxt.val(cols);
    $customMinesTxt.val(mines);
          self.newGame( 'custom', rows, cols, mines );
      });
      
      $customCancelBtn.bind('click', function() {
          $customDialog.hide();
          self.customDialogOpen = false;
      });
      /* END custom dialog events */
  
  $('#submit-high-score').bind('click', function() {
    $(this).attr('disabled', true);
    self.submitHighScore();	
  });
      
      // remove context menu from right click
      this.$windowWrapperOuter.bind('contextmenu dragstart drag', function() {
          return false;
      });
      
      /* reset button actions */
      this.$resetButton.bind('mousedown', function(e) {
          this.mouseDown = true;
          
          if (e.which === 3) {
              return false;
          }
          
          $(this).attr('class', 'face-pressed');
      }).bind('mouseup', function(e) {
          this.mouseDown = false;
          
          if (e.which === 3) {
              return false;
          }
          
          $(this).attr('class', 'face-smile');
      }).bind('mouseout', function(e) {
          if ( this.mouseDown ) {
              $(this).attr('class', 'face-smile');
          }
      }).bind('click', function(e) {
          if (e.which === 3) {
              return false;
          }
          
          self.reset();
      });
      
      this.newGame( this.defaultLevel );
      
      this.gameInitialized = true;
  }, // end init()
  
//-----------------------------------

  newGame: function( level, numRows, numCols, numMines, resetting ) {
      var resetting = resetting || false;
      
      // if game has initialized, must stop game before creating a new one
      if ( this.gameInitialized ) {
          this.stop();
      }
      
      // if we're only resetting, we don't need to perform all
      // the tasks we would for a new game.
      if ( resetting ) {
          var cell, 
              i,
              j;

          // reset cells    
          for ( i = 1; i <= this.numRows; i++ ) {
              for ( j = 1; j <= this.numCols; j++ ) {
                  cell = this.cells[i][j];
                  
                  cell.$elem.attr('class', 'covered');
                  cell.classUncovered = 'mines0';
                  cell.hasMine = false;
                  cell.numSurroundingMines = 0;
                  cell.flagStateIndex = 0; // 0 = covered, 1 = flag, 2 = question
              }
          }
      } else { // new game (not resetting)
          
          if ( level == 'custom' ) {
              this.numRows =      numRows;
              this.numCols =      numCols;
              this.numMines =     numMines;
              this.mineCount =    numMines;
          } else {
              var levelObj =  this.levels[ level ];
              this.numRows =  levelObj.rows;
              this.numCols =  levelObj.cols;
              this.numMines = levelObj.mines;
          }
  
          this.numCells =         this.numRows * this.numCols;
          this.numRowsActual =    this.numRows + 2;
          this.numColsActual =    this.numCols + 2;
          
          this.currentLevel = level;

          // set board width based on number of rows and columns
          this.$windowWrapperOuter.css('width', this.cellWidth * this.numCols + 27); // additional pixels to account for borders
          
          // create 2d cells array
          this.cells = new Array(this.numRowsActual);
          
          for ( i = 0; i < this.numRowsActual; i++ ) {
              this.cells[i] = new Array(this.numColsActual);
          }
          
          // clear out minefield cell elems
          this.$minefield.html('');
          
          // create new cells, and for each cell create object with properties,
          // which includes reference to jquery dom object       
          for ( i = 0; i < this.numRowsActual; i++ ) {
              for ( j = 0; j < this.numColsActual; j++ ) {
                  if ( !(i < 1 || i > this.numRows || j < 1 || j > this.numCols) ) {
                      $elem = $(document.createElement('div'))
                          .attr('class', 'covered');
                      
                      this.$minefield.append($elem);
                  } else {
                      $elem = null;
                  }
                  
                  // fill cells array element
                  this.cells[i][j] = {
                      $elem: $elem,
                      covered: false, // we initialize all to false and later set visible ones to true (during setting of click events)
                      classUncovered: 'mines0',
                      hasMine: false,
                      numSurroundingMines: 0,
                      flagStateIndex: 0 // 0 = covered, 1 = flag, 2 = question
                  }
              }
          } // end for (outer)
      } // end else new game
      
      
      
      this.setMineCount( this.numMines );
      
      this.setTimer( 0 );
      
      this.layMines();        
      
      // calculate and set number of surrounding mines for each cell
      this.calcMineCounts();
      
      this.setClickEvents();
      
      this.madeFirstClick = false;
      
      this.$resetButton.attr('class', 'face-smile');
  }, // end newGame()

//-----------------------------------
  
  setClickEvents: function() {
      for ( i = 1; i <= this.numRows; i++ ) {
          for ( j = 1; j <= this.numCols; j++ ) {
              var self = this,
                  cell = self.cells[i][j];
              
              // use this opportunity to set all visible cells to covered
              cell.covered = true;
              
              // hmmm....see http://stackoverflow.com/questions/1485770/how-to-store-local-variables-in-jquery-click-functions
              cell.$elem.bind('mousedown', {_i: i, _j: j, _cell: cell}, function(e) {
                  self.mouseDown = true;
                  
                  var d       = e.data,
                      _cell   = d._cell;
                  
                  // only do something if cell is covered
                  if ( _cell.covered ) {
                      // right mousedown
                      if (e.which === 3) {
                          // if this was a flag, means flag will be removed, so increment mine count
                          if (_cell.flagStateIndex == 1) {
                              self.setMineCount( self.mineCount + 1 );
                          }
                          
                          // cycle flagStateIndex
                          _cell.flagStateIndex = (_cell.flagStateIndex + 1) % self.numFlagStates;
                          
                          // if this becomes a flag, means flag added, so decrement mine count 
                          if (_cell.flagStateIndex == 1) {
                              self.setMineCount( self.mineCount - 1 );
                          }
                          
                          // set new cell class
                          _cell.$elem.attr('class', self.flagStates[ (_cell.flagStateIndex) ]);
                      } else {
                          // left mousedown
                          
                          if ( _cell.covered && _cell.flagStateIndex !== 1) {
                              self.$resetButton.attr('class', 'face-surprised');
                              _cell.$elem.attr('class', 'mines0');
                          }
                      } // end left mousedown
                  } // end if covered
              }).bind('mouseover', {_cell: cell}, function(e) {
                  if (self.mouseDown) {
                      var _cell = e.data._cell;
                      _cell.$elem.mousedown();
                  }
              }).bind('mouseout', {_cell: cell}, function(e) {
                  if (self.mouseDown) {
                      var _cell = e.data._cell;                        
                      if (_cell.covered) _cell.$elem.attr('class', 'covered');
                  }
              }).bind('mouseup', {_i: i, _j: j, _cell: cell}, function(e) {
                  self.mouseDown = false;
                  
                  var d       = e.data,
                      _i      = d._i,
                      _j      = d._j,
                      _cell   = d._cell;
                      
                  self.$resetButton.attr('class', 'face-smile');
                  
                  // only do something if cell is still covered and not flagged
                  if ( _cell.covered && _cell.flagStateIndex !== 1 ) {
                      // left mouse click
                      if (e.which !== 3) {
                          // on first click, make sure cell does not have a mine;
                          if (!self.madeFirstClick) {
                              self.madeFirstClick = true;
                              self.start();
                              
                              // if cell has mine, move mine and update surrounding mines numbers
                              if (_cell.hasMine) {
                                  self.moveMine( _i, _j );
                              }
                          } // end if first click
                          
                          // user clicks mine and loses
                          if (_cell.hasMine) {
                              _cell.classUncovered = 'mine-hit';
                              self.lose();
                          } else {
                              self.revealCells( _i, _j );
                              
                              // check for win
                              if ( self.checkForWin() ) {
                                  self.win();
                              }  
                          }
                      } // end left mouse click
                  } // end if cell.covered
              }); // end click event
          } // end for (inner)
      }  // end for (outer)
  }, // end setClickEvents()
  
//-----------------------------------    
  
  layMines: function() {
      var rowCol,
          cell,
          i;
      
      // designate mine spots
      this.designateMineSpots();
      
      for ( i = 0; i < this.numMines; i++ ) {
          rowCol = this.numToRowCol( this.mineCells[i] );
          cell = this.cells[ rowCol[0] ][ rowCol[1] ];            
          cell.hasMine = true;
          cell.classUncovered = 'mine';
      }
  }, // end layMines()

//-----------------------------------
      
  // designate unique random mine spots and store in this.mineCells
  designateMineSpots: function() {
      this.safeCells = [];
      this.mineCells = []
      
      var i,
          randIndex;

      i = this.numCells;
      while ( i-- ) {
          this.safeCells.push( i + 1 );
      }
      
      i = this.numMines;
      while ( i-- ) {
          randIndex = -~( Math.random() * this.safeCells.length ) - 1;
          this.mineCells.push( this.safeCells[randIndex] );
          this.safeCells.splice( randIndex, 1 ); // remove cell from array of safe cells
      }        
  }, // end designateMineSpots
  
//-----------------------------------    
  
  // calculate and set surrounding mine count for a cell
  calcMineCount: function( row, col ) {
      var count = 0,
          cell = this.cells[row][col],
          i, 
          j;
      
      for (i = row - 1; i <= row + 1; i++) {
          for (j = col - 1; j <= col + 1; j++) {
              // applying to surrounding cells, but we skip actual cell
              if (i == row && j == col) { continue; }
              
              if (this.cells[i][j].hasMine) { count++; }
          }
      }
      
      cell.numSurroundingMines = count;
      
      if (!cell.hasMine) { 
          cell.classUncovered = 'mines' + count;
      }
  },
  
//-----------------------------------

  // calculate and set surrounding mine count for each cell
  calcMineCounts: function() {
      for ( var i = 1; i <= this.numRows; i++ ) {
          for ( var j = 1; j <= this.numCols; j++ ) {
              this.calcMineCount( i, j );
          }
      }
  },

//-----------------------------------

  changeMineCount: function( row, col, numToAdd ) {
      // leave 3rd argument empty to increment, pass in -1 to decrement
      var numToAdd = numToAdd || 1,
          cell = this.cells[row][col];
          newMineCount = cell.numSurroundingMines + numToAdd;
      
      cell.numSurroundingMines = newMineCount;
      
      if (!cell.hasMine) {
          cell.classUncovered = 'mines' + newMineCount;
      }
  },

//-----------------------------------

  changeSurroundingMineCounts: function( row, col, numToAdd ) {
      for (i = row - 1; i <= row + 1; i++) {
          for (j = col - 1; j <= col + 1; j++) {
              // applying to surrounding cells, but we skip actual cell
              if (i == row && j == col) continue;
              
              this.changeMineCount( i, j, numToAdd );
          }
      }
  },
  
//-----------------------------------
  
  // move mine from given cell (row, col)
  moveMine: function( row, col ) {
      var cell = this.cells[row][col],
          spot = this.rowColToNum( row, col );
      
      // remove mine from this cell
      cell.hasMine = false;
      cell.classUncovered = 'mines' + cell.numSurroundingMines;
      
      // remove spot from mineCells and add to safeCells
      this.mineCells.splice( $.inArray(spot, this.mineCells), 1 );
      this.safeCells.push( spot );
      
      // decrement surrounding mine count of this cell
      this.changeSurroundingMineCounts( row, col, -1 );
      
      /* place mine in another random safe cell */
      var newIndex    = -~( Math.random() * this.safeCells.length ) - 1,
          newSpot     = this.safeCells[newIndex],
          newRowCol   = this.numToRowCol( newSpot ),                                  
          newMineCell = this.cells[ newRowCol[0] ][ newRowCol[1] ];

      newMineCell.hasMine = true;
      newMineCell.classUncovered = 'mine';
      
      // remove new spot from safeCells and add to mineCells
      this.safeCells.splice( $.inArray(newSpot, this.safeCells), 1 );
      this.mineCells.push( newSpot );
      
      // increment surrounding mine count of new mine cell
      this.changeSurroundingMineCounts( newRowCol[0], newRowCol[1], 1 );
  },

//-----------------------------------

  revealMines: function( won ) {
      var cell,
          rowCol,
          won = won || false;
          i,
          j;
      
      
      for ( i = 0; i < this.numMines; i++ ) {
          rowCol = this.numToRowCol( this.mineCells[i] );
          cell = this.cells[ rowCol[0] ][ rowCol[1] ];
          
          if ( won ) {
              // flag mine cell if not already flagged
              if ( cell.flagStateIndex !== 1 ) {
                  cell.flagStateIndex = 1;
                  cell.$elem.attr('class', 'flag');
              }
          } else {
              // if cell is flagged and there's no mine, mark as misflagged
              if ( cell.flagStateIndex === 1 && !cell.hasMine) {
                  cell.$elem.attr('class', 'mine-misflagged');
              } else if ( cell.hasMine ) {
                  cell.$elem.attr('class', cell.classUncovered);
              }
          }
      }
  },
  
//-----------------------------------

  flagMines: function() {
      this.revealMines( true );
  },

//-----------------------------------
  
  // recursive method
  revealCells: function( row, col ) {
      var cell = this.cells[row][col],
          testCell,
          i,
          j;
      
      // reveal cell
      cell.$elem.attr('class', cell.classUncovered);
      cell.covered = false;
      
      // recursion escape condition:
      // If surrounding mine count is greater than 0, don't recurse, just return.
      if (cell.numSurroundingMines > 0) {
          return;
      } else {
          /* if surrounding mine count is 0, recursively go through all 
              adjacent cells with mine count 0 and reveal surrounding cells */
          for (i = row - 1; i <= row + 1; i++) {
              for (j = col - 1; j <= col + 1; j++) {
                  // applying to surrounding cells, but we skip actual cell
                  if (i == row && j == col) continue;
                  
                  testCell = this.cells[i][j];
                  
                  // skip if already uncovered
                  if (!testCell.covered) {
                      continue;
                  }
                  
                  this.revealCells( i, j );                    
              }
          } // end for (outer)
      } // end else
  },

//-----------------------------------

  toggleMarks: function() {
      if ( this.includeMarks ) {
          // turn marks off
          this.includeMarks = false;
          this.flagStates.splice( this.flagStates.length - 1, 1 );
      } else {
          // turn marks on
          this.includeMarks = true;
          this.flagStates.push( 'question' );
      }
      
      this.numFlagStates = this.flagStates.length;
  },

//-----------------------------------
  
  numToRowCol: function( num ) {
      return [ Math.ceil(num/this.numCols), (num % this.numCols) || this.numCols ];
  },

//-----------------------------------
  
  rowColToNum: function( row, col ) {
      return (row - 1) * this.numRows + col;
  },

//-----------------------------------

  start: function() {
      this.gameInProgress = true;
      this.setTimer( 1 ); // start at 1 second, not 0
      this.runTimer();
  },

//-----------------------------------

  stop: function() {
      this.stopTimer();
      this.gameInProgress = false;
      
      // remove cell click events
      for ( var i = 1; i <= this.numRows; i++ ) {
          for ( var j = 1; j <= this.numCols; j++ ) {
              this.cells[i][j].$elem.unbind('click mouseup mousedown');
          }
      }
  },
  
//-----------------------------------

  reset: function() {
      this.newGame( null, null, null, null, true );
  },
  
//-----------------------------------

  setTimer: function( num, settingMineCount ) {
      var settingMineCount = settingMineCount || false,
          onesElem =      settingMineCount ? this.$mineCountOnes      : this.$timerOnes,
          tensElem =      settingMineCount ? this.$mineCountTens      : this.$timerTens,
          hundredsElem =  settingMineCount ? this.$mineCountHundreds  : this.$timerHundreds,
          ones = Math.abs( num % 10 ),
          tens = Math.abs( (num / 10) % 10 | 0 ),
          hundreds = num < 0 ? 'm' : ( (num / 100) % 10 | 0 );
      
      if ( settingMineCount ) {
          this.mineCount = num;
      } else {
          this.timer = num;
      }
      
      onesElem.attr('class', 't' + ones);
      tensElem.attr('class', 't' + tens);
      hundredsElem.attr('class', 't' + hundreds);
  },

//-----------------------------------

  setMineCount: function( num ) {
      this.setTimer( num, true );
  },

//-----------------------------------

  runTimer: function() {
      var self = this;
      
      this.stopTimerID = setTimeout(function() {
          if ( self.gameInProgress ) {
              // user loses if timer reaches 999
              if (self.timer > 998) {
                  self.lose();
                  return;
              }
              
              self.setTimer( ++self.timer );
              
              self.runTimer();
          }
      }, 1000);
  },

//-----------------------------------

  stopTimer: function() {
      clearTimeout( this.stopTimerID );
  },
  
//-----------------------------------

  lose: function() {
      this.stop();
      this.revealMines();
      this.$resetButton.attr('class', 'face-sad');
  },
  
//-----------------------------------

  checkForWin: function() {
      var openCells = 0;
      
      for ( var i = 1; i <= this.numRows; i++ ) {
          for ( var j = 1; j <= this.numCols; j++ ) {
              if ( !this.cells[i][j].covered ) openCells++;
          }
      }
      
      return openCells === this.numCells - this.numMines;
  },
  
//-----------------------------------

  win: function() {
  this.won = true;
  this.stop();
  this.flagMines();
      this.$resetButton.attr('class', 'face-sunglasses');
      this.setMineCount( 0 );
  
  var self = this,
    levelId = 1; //self.levels[self.currentLevel].id;
  
  // check if high score
  // $.get('minesweeper/ajax.minesweeper.php?t=' + (new Date()).getTime(), { checking: true, level_id: levelId, time: self.timer }, function( data ) {
  // 	// if ajax call returns a 'y' (yes), means it's a high score
  // 	if ( data == 'y' ) {
  // 		self.displayHighScoreDialog();	
  // 	}
  // });
  },

//-----------------------------------

displayHighScoreDialog: function() {
  $('#submit-high-score').attr('disabled', false);
  $('#high-score-dialog').show();
},

//-----------------------------------

submitHighScore: function() {
  if (!this.won) {
    return;
  }
  
  var self = this,
    name = $('#high-score-name-textbox').val(),
    levelId = 1; //self.levels[self.currentLevel].id;
    
  // show loading icon
  
},

//-----------------------------------

getHighScores: function() {
  
  
    
}

};

$(document).ready(function() {
minesweeper.init('game');
});