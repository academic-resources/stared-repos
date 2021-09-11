#ifndef BALL_H_
#define BALL_H_

#include "SDL.h"
#include "SDL_image.h"

#include "Physics/particle.h"

using namespace physics;

class Ball : public Particle {

private:
	SDL_Renderer* renderer;
	SDL_Texture* texture;

public:
	Ball(SDL_Renderer* renderer);
	~Ball();

	void Render();

	void Clean();
};

#endif