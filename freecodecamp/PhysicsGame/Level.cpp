#include "Level.h"
#include <iostream>
#include <ctime>


Level::Level(SDL_Renderer* renderer, int SCREEN_WIDTH, int SCREEN_HEIGHT) : resolver(maxContacts * 8)  {

	this->renderer = renderer;
	this->SCREEN_WIDTH = SCREEN_WIDTH;
	this->SCREEN_HEIGHT = SCREEN_HEIGHT;

	SDL_Surface* surface = IMG_Load("Images/background.png");
	background = SDL_CreateTextureFromSurface(renderer, surface);
	SDL_FreeSurface(surface);

	rigidballs = std::vector<shared_ptr<RigidBall>>();

	this->random = Random();

	cData.contactArray = contacts;

	//Demo stuff
	int staticBallCount = 23;
	float ballSpacer = 40;

	for (int i = 0; i < staticBallCount; i++)
	{
		AddStaticBall(new Vector3(random.randomReal(0, SCREEN_WIDTH), random.randomReal(0, SCREEN_HEIGHT),0));
	}
}

Level::~Level() {

	SDL_DestroyTexture(background);
}


void Level::Update(float deltaTime, bool mouseDown) {

	KillOutOfBoundsObjects();

	UpdateObjects(deltaTime);

	generateContacts();

	resolver.resolveContacts(
		cData.contactArray,
		cData.contactCount,
		deltaTime);

	if (mouseDown)
	{
		AddBall(new Vector3(40, 40, 0), new Vector3(50, 0, 0), new Vector3(0, 30, 0));
	}
}

void Level::KillOutOfBoundsObjects() {

	Vector3 position;
	shared_ptr<RigidBall> object;

	for (int i = 0; i < rigidballs.size(); i++)
	{
		object = rigidballs[i];
		object->body->getPosition(&position );

		if ( position.y > SCREEN_HEIGHT + object->radius )
		{
			RemoveBall(object);
			i--;
		}
	}
}

void Level::UpdateObjects(real deltaTime) {

	for each (shared_ptr<RigidBall> object in rigidballs)
	{
		object->body->integrate(0.1);
		object->calculateInternals();
	}
}

void Level::generateContacts() {
	// Set up the collision data structure
	cData.reset(maxContacts);
	cData.friction = (real)0.5;
	//cData.restitution = (real)0.9;
	cData.tolerance = (real)0.1;

	shared_ptr<RigidBall> object;
	shared_ptr<RigidBall> otherObject;

	int numberOfObjects = rigidballs.size();

	for (int i = 0; i < numberOfObjects - 1; i++)
	{
		object = rigidballs[i];

		for (int n = i + 1; n < numberOfObjects; n++)
		{
			otherObject = rigidballs[n];

			cData.restitution = object->restitution * otherObject->restitution;

			CollisionDetector::sphereAndSphere(*object, *otherObject, &cData);
		}
	}
}

void Level::Render() {
	SDL_Rect rect;
	rect.x = 0;
	rect.y = 0;
	rect.w = 1280;
	rect.h = 900;
	SDL_RenderCopy(renderer, background, 0, &rect);

	RenderObjects();
}

void Level::RenderObjects() {

	for each (shared_ptr<RigidBall> object in rigidballs)
	{
		object->Render();
	}
}

void Level::AddBall(Vector3* position, Vector3* velocity, Vector3* acceleration) {

	shared_ptr<RigidBall> newBall(new RigidBall(renderer));
	
	//newBall->body->setPosition(*position);
	//newBall->body->setVelocity(*velocity);

	newBall->body->setPosition(*new Vector3(random.randomReal(0,SCREEN_WIDTH), 0, 0));

	newBall->restitution = random.randomReal(0, 1);

	newBall->body->setMass(random.randomReal(1, 100));

	newBall->body->setAcceleration(*acceleration);

	newBall->radius = random.randomReal(10, 40);

	rigidballs.push_back(newBall);
}

void Level::AddStaticBall(Vector3* position) {

	shared_ptr<RigidBall> newBall(new RigidBall(renderer));

	newBall->body->setPosition(*position);
	newBall->body->setMass(REAL_MAX);

	newBall->radius = random.randomReal(10, 40);

	rigidballs.push_back(newBall);
}

void Level::RemoveBall(shared_ptr<RigidBall> ball) {

	for (vector<shared_ptr<RigidBall>>::iterator i = rigidballs.begin(); i != rigidballs.end(); ++i)
	{
		if (*i == ball)
		{
			rigidballs.erase(i);
			break;
		}
	}
}