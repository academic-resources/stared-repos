#include "RigidBall.h"
#include <iostream>


RigidBall::RigidBall(SDL_Renderer* renderer)
{
	this->renderer = renderer;

	SDL_Surface* surface = IMG_Load("Images/Cannonball.png");
	texture = SDL_CreateTextureFromSurface(renderer, surface);
	SDL_FreeSurface(surface);

	this->restitution = 1;

	body = new RigidBody();
	

	Matrix3 it;
	it.setDiagonal(5.0f,5.0f,5.0f);
	body->setInertiaTensor(it);
	body->setAngularDamping(0.9999999999f);
	

	body->setMass(4.0f);
	body->setDamping(0.99999999999f, 0.99999999999f);
	radius = 15;

	body->calculateDerivedData();
	body->setCanSleep(false);
	body->setAwake(true);
	calculateInternals();

	body->addTorque(Vector3(90, 90, 90));
}


RigidBall::~RigidBall()
{
	SDL_DestroyTexture(texture);

	delete(body);
}

void RigidBall::Clean()
{
	SDL_DestroyTexture(texture);
}

void RigidBall::Render() {
	SDL_Rect rect;	

	Vector3 rotation = Vector3();

	body->getRotation(&rotation);

	Vector3 position = Vector3();

	body->getPosition(&position);

	rect.x = position.x - radius;
	rect.y = position.y - radius;
	rect.w = radius+radius;
	rect.h = radius+radius;

	SDL_RenderCopyEx(renderer, texture, NULL, &rect, rotation.y, NULL, SDL_FLIP_NONE);

}