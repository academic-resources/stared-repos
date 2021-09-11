#pragma once
#include "SDL.h"
#include "SDL_image.h"

#include "Physics/physics.h"

#include "DrawableObject.h"

using namespace physics;

class RigidBall : public DrawableObject, public CollisionSphere
{

public:
	RigidBall(SDL_Renderer* renderer);
	~RigidBall();

	float restitution;

	void Render();
	void Clean();

	SDL_Texture* texture;
};

