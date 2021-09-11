#include <iostream>
#include "DGame.h"

// using namespace std;
using std::cout;
using std::cin;

int main(void)
{
	cout << "Welcome to the Dungeon game!  The object of this game is to exit the maze(reach the X) with as much cash as possible.\n";
	cout << "You are the P.  T are traps, and G is gold.  Enter w to move up, x to move down, a to move left, and d to move right.\n";
	cout << "Press enter to continue.\n";
	cin.get();
	DGame dg;

	dg.printBoard();
	char input_char;
	char output_char = 'z';
	bool game_condition = true;
	do
	{
		cout << "\nEnter command and then press enter. (h for help, q to quit).\n";
		if(output_char != 'i')
			dg.updateBoard();
		cin >> input_char;
		output_char = dg.movePlayer(input_char);
		if(output_char != 'i')
			game_condition = dg.checkAndUpdate();
		if(input_char == 'h' || input_char == 'i') continue;
		system("cls");
		dg.printBoard();
	}
	while(input_char != 'q' && input_char != 'Q' && game_condition == true);
	
	game_condition = dg.winCondition();

	if(game_condition)
		cout << "\nYou win! You made it out of the dungeon!\n";
	else if(!game_condition && (input_char != 'q' && input_char != 'Q'))
		cout << "\nYou lose! Try again please.\n";

	cout << "Game Over!\n\nEnd of program.\n";
	system("pause");

	return 0;
}