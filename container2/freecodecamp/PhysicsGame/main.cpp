#include "Game.h"
#include <thread>

bool alive = true;

void call_from_thread() {
	while (alive)
	{
		std::cout << "Running..." << std::endl;
	}

}

int main(int argc, char* argv[]) 
{
	//Alec was here

	// Create the game object
	Game* game = new Game();

	std::thread t1(call_from_thread);

	// Initialize and run the game
	if (game->Init()) {
		game->Run();
	}

	// Clean up
	delete game;
	alive = false;
	t1.join();
	return 0;
}