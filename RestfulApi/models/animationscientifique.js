'use strict';
module.exports = (sequelize, DataTypes) => {
  var AnimationScientifique = sequelize.define('AnimationScientifique', {
    denomination: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    lieu: DataTypes.STRING
  }, {});
  AnimationScientifique.associate = function(models) {
    // associations can be defined here
  };
  return AnimationScientifique;
};