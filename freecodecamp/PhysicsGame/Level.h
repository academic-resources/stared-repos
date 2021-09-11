#ifndef LEVEL_H_
#define LEVEL_H_

#include <SDL.h>
#include <SDL_image.h>
#include "RigidBall.h"
#include <vector>
#include <memory>
#include "Physics\random.h"

using namespace physics;
using namespace std;

class Level
{
private:
	SDL_Renderer* renderer;
	SDL_Texture* background;

	int SCREEN_WIDTH, SCREEN_HEIGHT;

	Random random;

	std::vector<std::shared_ptr<RigidBall>> rigidballs;

	void RenderObjects();

	/** Holds the maximum number of contacts. */
	const static unsigned maxContacts = 512;

	/** Holds the array of contacts. */
	Contact contacts[maxContacts];

	/** Holds the collision data structure for collision detection. */
	CollisionData cData;

	/** Holds the contact resolver. */
	ContactResolver resolver;

	void generateContacts();
	void UpdateObjects(real deltaTime);
	
	void KillOutOfBoundsObjects();

public:
	Level(SDL_Renderer* renderer, int SCREEN_WIDTH, int SCREEN_HEIGHT);
	~Level();

	virtual void Update(float deltaTime, bool mouseDown);
	virtual void Render();

	void Level::AddBall(Vector3* position, Vector3* velocity, Vector3* acceleration);
	void Level::AddStaticBall(Vector3* position);
	void Level::RemoveBall(shared_ptr<RigidBall> ball);
};

#endif