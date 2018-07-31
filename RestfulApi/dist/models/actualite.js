'use strict';
module.exports = (sequelize, DataTypes) => {
  var Actualite = sequelize.define('Actualite', {
    denomination: DataTypes.STRING,
    contenu: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Actualite.associate = function(models) {
    // associations can be defined here
  };
  return Actualite;
};