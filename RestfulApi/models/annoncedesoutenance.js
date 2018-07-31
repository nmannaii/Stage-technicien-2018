'use strict';
module.exports = (sequelize, DataTypes) => {
  var AnnonceDeSoutenance = sequelize.define('AnnonceDeSoutenance', {
    domaine: DataTypes.STRING,
    niveau: DataTypes.STRING,
    sujet: DataTypes.STRING,
    date_de_soutenance: DataTypes.DATE,
    lieu: DataTypes.STRING,
    impetrant: DataTypes.STRING,
    denomination: DataTypes.STRING,
    contenu: DataTypes.STRING,
    fichier: DataTypes.STRING
  }, {});
  AnnonceDeSoutenance.associate = function(models) {
    // associations can be defined here
  };
  return AnnonceDeSoutenance;
};