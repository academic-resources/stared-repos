'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
      },
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, {foreignKey: 'artistId'});
    Album.hasMany(models.Song, {foreignKey: 'albumId'});
  };
  return Album;
};
