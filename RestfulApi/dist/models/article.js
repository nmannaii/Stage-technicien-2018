'use strict';
module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Article', {
    denomination: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    volume: DataTypes.STRING,
    date_de_parution: DataTypes.DATEONLY,
    mot_cle: DataTypes.STRING,
    resume: DataTypes.TEXT,
    pages: DataTypes.STRING,
    auteurs: DataTypes.STRING,
    domaine: DataTypes.STRING,
    revue_scientifique: DataTypes.STRING,
    fichier: DataTypes.STRING
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};