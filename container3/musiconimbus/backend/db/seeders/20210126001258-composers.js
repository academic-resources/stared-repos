'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Composers', [
        {
          firstName: 'David',
          lastName: 'Popper'
        },
        {
          firstName: 'Unknown',
          lastName: null
        },
        {
          firstName: 'Maurice',
          lastName: 'Ravel'
        },
        {
          firstName: 'Zoltan',
          lastName: 'Kodály'
        },
        {
          firstName: 'Astor',
          lastName: 'Piazzolla'
        },
        {
          firstName: 'Franz Joseph',
          lastName: 'Haydn'
        },
        {
          firstName: 'Dmitri',
          lastName: 'Shostakovich'
        },
        {
          firstName: 'Johann Sebastian',
          lastName: 'Bach'
        },
        {
          firstName: 'Johannes',
          lastName: 'Brahms'
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Composers', null, {});
  }
};
