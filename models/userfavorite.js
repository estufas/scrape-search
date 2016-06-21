'use strict';
module.exports = function(sequelize, DataTypes) {
  var userFavorite = sequelize.define('userFavorite', {
    userId: DataTypes.INTEGER,
    linkId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    }
  });
  return userFavorite;
};