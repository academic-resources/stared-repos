#include "Ball.h"

Ball::Ball(SDL_Renderer* renderer) : Particle(){
	this->renderer = renderer;

	SDL_Surface* surface = IMG_Load("Images/Cannonball.png");
	texture = SDL_CreateTextureFromSurface(renderer, surface);
	SDL_FreeSurface(surface);
}

Ball::~Ball() {
	// Clean resources
	SDL_DestroyTexture(texture);
}

void Ball::Clean()
{
	SDL_DestroyTexture(texture);
}

void Ball::Render() {
	SDL_Rect rect;

	Vector3 position = Vector3();

	getPosition(&position);

	rect.x = position.x-15; 
	rect.y = position.y-15; 
	rect.w = 30;
	rect.h = 30;
	SDL_RenderCopy(renderer, texture, 0, &rect);
}

