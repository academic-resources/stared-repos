#ifndef GAME_H_
#define GAME_H_

#include "SDL.h"
#include "SDL_image.h"
#include <iostream>
#include <vector>
#include "Timer.h"

#include "Level.h"

class Game {
public:
	Game();
	~Game();

	bool Init(); //initializes game variables
	void Run();  // runs main game loop

private:
	SDL_Window* window;       // game window
	SDL_Renderer* renderer;   // the renderer for the whole game

	Level* level;  // the games one and only level (for now)

	const int SCREEN_WIDTH = 1280;
	const int SCREEN_HEIGHT = 720;
	const int SCREEN_FPS = 60;
	const int SCREEN_TICKS_PER_FRAME = 1000 / SCREEN_FPS;

	void Clean();  // destroy everything
	void Update(); 
	void Render(); // draw

	//keyboard input flags
	bool mouseDown, clicked, makeItRain;
	
};

#endif
