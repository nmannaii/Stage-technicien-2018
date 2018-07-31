'use strict';
module.exports = (sequelize, DataTypes) => {
  var GroupeDeRecherche = sequelize.define('GroupeDeRecherche', {
    denomination: DataTypes.STRING,
    abreviation: DataTypes.STRING,
    tel: DataTypes.STRING,
    fax: DataTypes.STRING,
    email: DataTypes.STRING,
    objectif: DataTypes.STRING,
    mots_cles: DataTypes.STRING,
    responsable: DataTypes.STRING
  }, {});
  GroupeDeRecherche.associate = function(models) {
    // associations can be defined here
  };
  return GroupeDeRecherche;
};