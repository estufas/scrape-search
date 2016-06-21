'use strict';

module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define('link', {
    title: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return link;
};