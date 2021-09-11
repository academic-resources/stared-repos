#pragma once
#include "SDL.h"
#include "SDL_image.h"

#include "Physics/physics.h"

using namespace physics;
class DrawableObject
{
public:
	//DrawablePhysicsObject(SDL_Renderer* renderer, CollisionPrimitive* collider);
	//~DrawablePhysicsObject();

	virtual void Render() = 0;
	virtual void Clean() = 0;

	SDL_Renderer* renderer;
	
};

