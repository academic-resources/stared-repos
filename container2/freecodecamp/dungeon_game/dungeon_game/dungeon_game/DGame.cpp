#include "DGame.h"
#include <iostream>

// Constructor

DGame::DGame(int numberOfPlayers)
{
	playersNum = numberOfPlayers;
	cash = 0;
	lives = 3;
	int count = 1;
	// fill in the board
	for (int rr = 0; rr <ROWS; ++rr)
		for(int cc = 0; cc<COLS; ++cc)
		{
			Board[cc][rr] = bempty;
			if((cc > 0) && (cc % 2) && !(rr % 2) && (rr > 0))
				Board[cc][rr] = bhoriz;
			else if((rr > 0) && (rr % 2) && !(cc % 2) && (cc > 0))
				Board[cc][rr] = bvert;
			else if((rr > 0) && !(rr % 2) && (cc > 0) && !(cc % 2))
				Board[cc][rr] = bdot;
		}

	r1 = 2; c1 = 2;
		
	Board[r1][c1] = bplayer1;
	Board[0][0] = bempty;
	Board[2][0] = coord_r0;
	Board[4][0] = coord_r1;
	Board[6][0] = coord_r2;
	Board[8][0] = coord_r3;
	Board[10][0] = coord_r4;
	Board[12][0] = coord_r5;
	Board[14][0] = coord_r6;
	Board[16][0] = coord_r7;
	Board[18][0] = coord_r8;
	Board[20][0] = coord_r9;

	Board[0][2] = coord_col0;
	Board[0][4] = coord_col1;
	Board[0][6] = coord_col2;
	Board[0][8] = coord_col3;
	Board[0][10] = coord_col4;
	Board[0][12] = coord_col5;
	Board[0][14] = coord_col6;
	Board[0][16] = coord_col7;
	Board[0][18] = coord_col8;
	Board[0][20] = coord_col9;

	Board[2][4] = btrap;
	Board[8][16] = btrap;
	Board[4][18] = bgold;
	Board[6][12] = bgold;
	Board[10][4] = btrap;
	Board[18][16] = btrap;
	Board[16][18] = bgold;

	Board[ROWS-2][COLS-2] = bexit;
}

// We will change this later on!
// Not a good practice.

const char BoardElementsChars[] = {'.', 'P', 'T', 'G', 'X', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '|', '_', ' '};

//Call: dg.printBoard()
void DGame::printBoard()
{
	std::cout << "\nPrinting board: Fancy style.\n";

	for (int rr = 0; rr <ROWS; ++rr)
	{
		for(int cc = 0; cc<COLS; ++cc)
		{
			// std::cout << Board[rr][cc];
			// char c = BoardElementsChars[Board[rr][cc]];

			char c = BoardElementsToChars(Board[rr][cc]);
			std::cout << c;
		}
		std::cout << std::endl;
	}
	std::cout << "Cash: " << cash << "   Lives: " << lives << std::endl;
}

char DGame::BoardElementsToChars(BoardElements b) const
{
	char c;
	switch(b)
	{
	case coord_r0:
		c = '0';
		break;
	case coord_r1:
		c = '1';
		break;
	case coord_r2:
		c = '2';
		break;
	case coord_r3:
		c = '3';
		break;
	case coord_r4:
		c = '4';
		break;
	case coord_r5:
		c = '5';
		break;
	case coord_r6:
		c = '6';
		break;
	case coord_r7:
		c = '7';
		break;
	case coord_r8:
		c = '8';
		break;
	case coord_r9:
		c = '9';
		break;
	case coord_col0:
		c = '0';
		break;
	case coord_col1:
		c = '1';
		break;
	case coord_col2:
		c = '2';
		break;
	case coord_col3:
		c = '3';
		break;
	case coord_col4:
		c = '4';
		break;
	case coord_col5:
		c = '5';
		break;
	case coord_col6:
		c = '6';
		break;
	case coord_col7:
		c = '7';
		break;
	case coord_col8:
		c = '8';
		break;
	case coord_col9:
		c = '9';
		break;
	case bvert:
		c = '|';
		break;
	case bhoriz:
		c = '_';
		break;
	case bempty:
		c = ' ';
		break;
	case bdot:
		c = '.';
		break;
	case bplayer1:
		c = 'P';
		break;
	case btrap:
		c = 'T';
		break;
	case bgold:
		c = 'G';
		break;
	case bexit:
		c = 'X';
		break;
	default:
		c = '?';

	}
	return c;
}

char DGame::movePlayer(char key) // method that takes in user input and moves the player accordingly -- also offers help or quit command
{
	switch(key)
	{
	case('w'): // moving the player up
		{
			r1 = r1 - 2; // reset player row coordinate
			checkOutofBounds();
			Board[r1][c1] = bplayer1;
		}
		break;
	case('W'): // moving the player up
		{
			r1 = r1 - 2; // reset player row coordinate
			checkOutofBounds();
			Board[r1][c1] = bplayer1;
		}
		break;
	case'x': // moving the player down
		{
			r1 = r1 + 2; // reset player row coordinate
			checkOutofBounds();
			Board[r1][c1] = bplayer1;
		}
		break;
	case'X': // moving the player down
		{
			r1 = r1 + 2; // reset player row coordinate
			checkOutofBounds();
			Board[r1][c1] = bplayer1;
		}
		break;
	case('a'): // moving the player left
		{
			c1 = c1 - 2; // reset player column coordinate
			checkOutofBounds();
			Board[r1][c1] = bplayer1;
		}
		break;
	case('A'): // moving the player left
		{
			c1 = c1 - 2; // reset player column coordinate
			checkOutofBounds();
			Board[r1][c1] = bplayer1;
		}
		break;
	case('d'): // moving the player right
		{
			c1 += 2; // reset player column coordinate
			checkOutofBounds();
			Board[r1][c1] = bplayer1;
		}
		break;
	case('D'): // moving the player right
		{
			c1 += 2; // reset player column coordinate
			checkOutofBounds();
			Board[r1][c1] = bplayer1;
		}
		break;
	case('h'): // help command
		{
			//helpFunction()?
			std::cout << "\nPress w to move up, x to move down, a to move left, or d to move right.\n";
			cin.get();
		}
		break;
	case('H'): // help command
		{
			//helpFunction()?
			std::cout << "\nPress w to move up, x to move down, a to move left, or d to move right.\n";
			cin.get();
		}
		break;
	case('q'): // quit command
		return 'q';
		break;
	case('Q'): // quit command
		return 'q';
		break;
	default:
		{
		std::cout << "\nIncorrect input, please enter a valid key. Press h for help, q to quit.\n";
		cin.get();
		cin.get();
		return 'i';
		}
	}
	return key;
}

void DGame::updateBoard()
{
	Board[r1][c1] = bempty;
}

void DGame::checkOutofBounds()
{
	if(r1 < 2) 
		r1 = 2;
	else if (r1 > 20) 
		r1 = 20;
	if(c1 < 2) 
		c1 = 2;
	else if(c1 > 20)
		c1 = 20;
}

bool DGame::checkAndUpdate()
{
	if((r1 == 2 && c1 == 4) || (r1 == 8 && c1 == 16) || (r1 == 10 && c1 == 4) || (r1 == 18  && c1 == 16))
		lives--;
	if((r1 == 4 && c1 == 18) || (r1 == 6 && c1 == 12) || (r1 == 16 && c1 == 18))
		cash++;
	if(lives <= 0)
		return false;
	if((r1 == ROWS-2) && (c1 == COLS-2))
		return false;
	return true;
}

bool DGame::winCondition()
{
	if((r1 == ROWS-2) && (c1 == COLS-2))
		return true;
	else return false;
}

void helpFunction()
{
	DGame dgm;
	std::cout << "\nPress w to move up, x to move down, a to move left, or d to move right.\n";
	char input;
	cin >> input;
	dgm.movePlayer(input);
}

/* std::ostream & operator<<(std::ostream & os, const DGame game)
{
	std::cout << "Cash: " << game.cash << "   Lives: " << game.lives << std::endl;
	return os;
}
*/
