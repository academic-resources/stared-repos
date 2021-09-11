#include <cstdlib>
#include "pworld.h"

using namespace BakariPhysicsPlus;

ParticleWorld::ParticleWorld(unsigned maxContacts, unsigned iterations)
:
resolver(iterations),
maxContacts(maxContacts)
{
    contacts = new ParticleContact[maxContacts];
    calculateIterations = (iterations == 0);


}

ParticleWorld::~ParticleWorld()
{
    delete[] contacts;
}

void ParticleWorld::startFrame()
{
    for (Particles::iterator p = particles.begin();
        p != particles.end();
        p++)
    {
        // Remove all forces from the accumulator
        (*p)->clearAccumulator();
    }
}

unsigned ParticleWorld::generateContacts()
{
    unsigned limit = maxContacts;
    ParticleContact *nextContact = contacts;

    for (ContactGenerators::iterator g = contactGenerators.begin();
        g != contactGenerators.end();
        g++)
    {
        unsigned used =(*g)->addContact(nextContact, limit);
        limit -= used;
        nextContact += used;

        // We've run out of contacts to fill. This means we're missing
        // contacts.
        if (limit <= 0) break;
    }

    // Return the number of contacts used.
    return maxContacts - limit;
}

void ParticleWorld::integrate(real duration)
{
    for (Particles::iterator p = particles.begin();
        p != particles.end();
        p++)
    {
        // Remove all forces from the accumulator
        (*p)->integrate(duration);
    }
}

void ParticleWorld::runPhysics(Particle** particleArray, real duration, int size)
{
	// iterating through the particle array
	Particle* particle;
	for (int i = 0; i < size; i++)
	{
		particle = particleArray[i];
		particle->integrate(duration);
	}

    // First apply the force generators
   // registry.updateForces(duration);

    // Then integrate the objects
    // integrate(duration);

    // Generate contacts
	// unsigned usedContacts = generateContacts();

    // And process them
    /*if (usedContacts)
    {
        if (calculateIterations) resolver.setIterations(usedContacts * 2);
        resolver.resolveContacts(contacts, usedContacts, duration);
    } */
}

ParticleWorld::Particles& ParticleWorld::getParticles()
{
    return particles;
}

ParticleWorld::ContactGenerators& ParticleWorld::getContactGenerators()
{
    return contactGenerators;
}

ParticleForceRegistry& ParticleWorld::getForceRegistry()
{
    return registry;
}

void GroundContacts::init(BakariPhysicsPlus::ParticleWorld::Particles *particles)
{
    GroundContacts::particles = particles;
}

unsigned GroundContacts::addContact(BakariPhysicsPlus::ParticleContact *contact,
                                    unsigned limit) const
{
    unsigned count = 0;
   /* for (BakariPhysicsPlus::ParticleWorld::Particles::iterator p = particles->begin();
        p != particles->end();
        p++)
    {
        BakariPhysicsPlus::real y = (*p)->getPosition().y;
        if (y < 0.0f)
        {
            contact->contactNormal = BakariPhysicsPlus::Vector3::UP;
            contact->particle[0] = *p;
            contact->particle[1] = NULL;
            contact->penetration = -y;
            contact->restitution = 0.2f;
            contact++;
            count++;
        }

        if (count >= limit) return count;
    }*/
    return count;
}