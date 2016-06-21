'use strict';

module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // models.favorite.belongsTo(models.user);
        // models.favorite.belongsToMany(models.user, {through:"userFavorite"});
      }
    }
  });
  return favorite;
};