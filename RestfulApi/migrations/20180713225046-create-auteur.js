'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Auteurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      domaine: {
        allowNull: false,
        type: Sequelize.STRING
      },
      groupe_de_recherche: {
        allowNull: true,
        type: Sequelize.STRING
      },
      specialite: {
        allowNull: false,
        type: Sequelize.STRING
      },
      grade: {
        allowNull: false,
        type: Sequelize.STRING
      },
      etablissement: {
        allowNull: false,
        type: Sequelize.STRING
      },
      diplome_en_preparation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tel: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mot_de_passe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: true,
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
    return queryInterface.dropTable('Auteurs');
  }
};