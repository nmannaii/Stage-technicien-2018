'use strict';
module.exports = (sequelize, DataTypes) => {
  var Auteur = sequelize.define('Auteur', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    domaine: DataTypes.STRING,
    groupe_de_recherche: DataTypes.STRING,
    specialite: DataTypes.STRING,
    grade: DataTypes.STRING,
    etablissement: DataTypes.STRING,
    diplome_en_preparation: DataTypes.STRING,
    tel: DataTypes.STRING,
    email: DataTypes.STRING,
    mot_de_passe: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Auteur.associate = function(models) {
    // associations can be defined here
  };
  return Auteur;
};