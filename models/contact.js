'use strict';

module.exports = function(sequelize, DataTypes) {
  var contact = sequelize.define('contact', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return contact;
};