'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Playlists', [
        {
          userId: 1,
          title: "My Playlist"
        },
        {
          userId: 2,
          title: "Favorite Tracks"
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Playlists', null, {});
  }
};
