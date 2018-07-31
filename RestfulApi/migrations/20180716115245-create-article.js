'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      denomination: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.INTEGER
      },
      volume: {
        type: Sequelize.STRING
      },
      date_de_parution: {
        type: Sequelize.DATEONLY
      },
      mot_cle: {
        type: Sequelize.STRING
      },
      resume: {
        type: Sequelize.TEXT
      },
      pages: {
        type: Sequelize.STRING
      },
      auteurs: {
        type: Sequelize.STRING
      },
      domaine: {
        type: Sequelize.STRING
      },
      revue_scientifique: {
        type: Sequelize.STRING
      },
      fichier: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Articles');
  }
};