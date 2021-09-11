#ifndef _DGAME_H_
#define _DGAME_H_

// The above ensures non multiple-inclusion of header files
// Pre-processor operation
using namespace std;

const int ROWS = 22;
const int COLS = 22;

enum BoardElements {bempty=0, bdot, bplayer1, bplayer2, btrap, bgold, bexit, coord_r1, coord_r2, coord_r3, coord_r4, coord_r5, 
				   coord_r6, coord_r7, coord_r8, coord_r9, coord_r0, coord_col1, coord_col2, coord_col3, coord_col4, coord_col5, coord_col6, 
				   coord_col7, coord_col8, coord_col9, coord_col0, bvert, bhoriz};

class DGame
{
private:
	BoardElements Board[ROWS][COLS];
	int r1, c1; // Player coordinates
	int cash;
	int lives;
	int playersNum;

	char BoardElementsToChars(BoardElements b) const;

public:

	// Default constructor is supplied with No arguments.
	// If you create your own constructor, you have to take care
	// of empty constructor

	DGame(int numberOfPlayers = 1);
	void printBoard();
	char movePlayer(char key);
	void updateBoard();
	void checkOutofBounds();
	bool checkAndUpdate();
	bool winCondition();
	void helpFunction();
//	friend std::ostream & operator<<(std::ostream & os, const DGame game);
};



#endif
