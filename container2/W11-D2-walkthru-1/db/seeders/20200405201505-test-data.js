'use strict';

module.exports = {
  up: async (queryInterface) => {
    const parks = await queryInterface.bulkInsert('Parks', [
      {
        parkName: 'Disneyland Park',
        city: 'Anaheim',
        provinceState: 'California',
        country: 'USA',
        opened: new Date('1955-07-17'),
        size: '486 acres',
        description: 'Disneyland Park, originally Disneyland, is the first of two theme parks built at the Disneyland Resort in Anaheim, California, opened on July 17, 1955. It is the only theme park designed and built to completion under the direct supervision of Walt Disney. It was originally the only attraction on the property; its official name was changed to Disneyland Park to distinguish it from the expanding complex in the 1990s. It was the first Disney theme park.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        parkName: 'Disney California Adventure Park',
        city: 'Anaheim',
        provinceState: 'California',
        country: 'USA',
        opened: new Date('2001-02-08'),
        size: '72 acres',
        description: 'Disney California Adventure Park, commonly referred to as Disney California Adventure, California Adventure, or DCA, is a theme park located in Anaheim, California. It is owned and operated by The Walt Disney Company through its Parks, Experiences and Products division. The 72-acre (29 ha) park is themed after the history and culture of California, which celebrates the fun and adventure of the state through the use of various Disney, Pixar and Marvel properties. The park opened on February 8, 2001 as Disney\'s California Adventure Park or Disney\'s California Adventure, and it is the second of two theme parks built at the Disneyland Resort complex, after Disneyland Park.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      returning: true
    });

    return queryInterface.bulkInsert('Attractions', [
      {
        attractionName: 'Haunted Mansion',
        parkId: parks[0].id,
        theme: 'Ghosts',
        opened: new Date('1969-08-09'),
        ridersPerVehicle: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        attractionName: 'Pirates of the Caribbean',
        parkId: parks[0].id,
        theme: 'Pirates',
        opened: new Date('1967-03-18'),
        ridersPerVehicle: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        attractionName: 'Indiana Jones Adventure',
        parkId: parks[0].id,
        theme: 'Indiana Jones',
        opened: new Date('1995-03-04'),
        ridersPerVehicle: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        attractionName: 'Space Mountain',
        parkId: parks[0].id,
        theme: 'Space',
        opened: new Date('1975-01-15'),
        ridersPerVehicle: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        attractionName: 'Matterhorn Bobsleds',
        parkId: parks[0].id,
        theme: 'Mountain',
        opened: new Date('1959-06-04'),
        ridersPerVehicle: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        attractionName: 'Radiator Springs Racers',
        parkId: parks[1].id,
        theme: 'Pixar\'s Cars',
        opened: new Date('2012-06-15'),
        ridersPerVehicle: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        attractionName: 'Guardians of the Galaxy Mission Breakout',
        parkId: parks[1].id,
        theme: 'Marvel\'s Guardians of the Galaxy',
        opened: new Date('2017-05-27'),
        ridersPerVehicle: 36,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        attractionName: 'Grizzly River Run',
        parkId: parks[1].id,
        theme: 'River Rafting',
        opened: new Date('2001-02-08'),
        ridersPerVehicle: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Attractions', null, {});
    return queryInterface.bulkDelete('Parks', null, {});
  },
};
