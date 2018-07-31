'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AnnonceDeSoutenances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      domaine: {
        type: Sequelize.STRING
      },
      niveau: {
        type: Sequelize.STRING
      },
      sujet: {
        type: Sequelize.STRING
      },
      date_de_soutenance: {
        type: Sequelize.DATE
      },
      lieu: {
        type: Sequelize.STRING
      },
      impetrant: {
        type: Sequelize.STRING
      },
      denomination: {
        type: Sequelize.STRING
      },
      contenu: {
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
    return queryInterface.dropTable('AnnonceDeSoutenances');
  }
};