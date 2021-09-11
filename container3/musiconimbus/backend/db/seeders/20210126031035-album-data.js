'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Albums', [
        {
          title: 'Cordova Quartet Live',
          artistId: 3,
          releaseDate: 2016,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/CordovaQuartet-cover.jpg',
          description: 'From a recital at the University of Texas in March 2016.'
        },
        {
          title: 'Romantic Cello Favorites',
          artistId: 5,
          releaseDate: 1989,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/starker.jpg',
          description: 'A tribute to cellist and composer David Popper.'
        },
        {
          title: 'Brahms',
          artistId: 7,
          releaseDate: 2007,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/emerson-cover.jpg',
          description: 'Featuring Brahms\' piano quintet with Leon Fleisher and all three string quartets.'
        },
        {
          title: 'Hilary Hahn plays Bach',
          artistId: 2,
          releaseDate: 1997,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/hilary-cover.jpg',
          description: 'Featuring J.S. Bach\'s Partitas no. 2 and 3 and Sonata no. 3 for solo violin.'
        },
        {
          title: 'Shostakovich: The 15 String Quartets',
          artistId: 6,
          releaseDate: 2007,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/shostakovich-cover.jpg',
          description: 'The complete string quartets of Dmitri Shostakovich, recorded by the ensemble for whom they were written between 1956-1974.'
        },
        {
          title: 'Haydn String Quartets, Op. 76 1-3',
          artistId: 8,
          releaseDate: 1988,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/takacs-haydn.jpg',
          description: null
        },
        {
          title: 'Soul of the Tango',
          artistId: 4,
          releaseDate: 1997,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/tango-cover.jpg',
          description: 'The music of Astor Piazzolla.'
        },
        {
          title: 'Solo',
          artistId: 4,
          releaseDate: 1999,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/kodaly-cover.jpg',
          description: 'An exploration of solo music for the cello, influenced by cultures around the world.'
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Albums', null, {});
  }
};
