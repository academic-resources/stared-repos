#include "Game.h"

Game::Game() {
	window = 0;
	renderer = 0;
}

Game::~Game() {

}

bool Game::Init() {
	// Initialize SDL and the video subsystem
	SDL_Init(SDL_INIT_VIDEO);
	
	// Initialize input flags 
	mouseDown = clicked = makeItRain = false;

	// Create window (800x600)
	window = SDL_CreateWindow("Physics Game",
		SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
		SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN | SDL_WINDOW_OPENGL);
	if (!window) {
		// Error creating window
		return false;
	}

	// Create renderer
	renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);
	if (!renderer) {
		// Error creating renderer
		return false;
	}

	return true;
}

void Game::Clean() {
	// Clean renderer and window
	SDL_DestroyRenderer(renderer);
	SDL_DestroyWindow(window);
}

void Game::Run() {

	level = new Level(renderer, SCREEN_WIDTH, SCREEN_HEIGHT);

	LTimer fpsTimer;

	//The frames per second cap timer
	LTimer capTimer;

	//Keeps track of time between steps
	//LTimer stepTimer;
	//stepTimer.start();

	//Start counting frames per second
	int countedFrames = 0;
	fpsTimer.start();

	// Main loop
	while (1) {

		capTimer.start();

		// Handler events
		SDL_Event e;


		if (SDL_PollEvent(&e)) {
			if (e.type == SDL_QUIT) {
				break;
			}

		}

		// Check for mouse click
		mouseDown = false;
		if (e.type == SDL_MOUSEBUTTONDOWN && !clicked)
		{
			mouseDown = true;
		}

		if (e.type == SDL_KEYDOWN){
			makeItRain = true;
		}

		if (e.type == SDL_MOUSEBUTTONUP)
		{
			clicked = false;
		}

		//Calculate and correct fps
		float avgFPS = countedFrames / (fpsTimer.getTicks() / 1000.f);
		if (avgFPS > 2000000)
		{
			avgFPS = 0;
		}

		// Update and render the game
		Update();
		Render();

		++countedFrames;

		//Restart step timer
		//stepTimer.start();

		int frameTicks = capTimer.getTicks();
		if (frameTicks < SCREEN_TICKS_PER_FRAME)
		{
			//Wait remaining time
			SDL_Delay(SCREEN_TICKS_PER_FRAME - frameTicks);
		}
	
	}

	// destroy game
	Clean();

	SDL_Quit();
}

void Game::Update() {
	
	// Update level with keys pressed
	if (!clicked && mouseDown)
	{
		clicked = true;

	}
	else
	{
		mouseDown = false;
	}
	if (makeItRain)
		mouseDown = true;
	level->Update(0.1, mouseDown);
}


void Game::Render() {

	// Clear the screen to black
	SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);
	SDL_RenderClear(renderer);

	// Draw level
	level->Render();

	// Draw the screen
	SDL_RenderPresent(renderer);
}
