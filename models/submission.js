'use strict';

module.exports = function(sequelize, DataTypes) {
  var submission = sequelize.define('submission', {
    body: DataTypes.STRING,
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      models.submission.belongsTo(models.user);

      }
    }
  });
  return submission;
};