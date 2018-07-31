const models = require('../models');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');
const editDate = require('./editDate');

module.exports = {
  addAnnonce: (req, res) => {
      var domaine = req.body.domaine;
      var niveau = req.body.niveau;
      var sujet = req.body.sujet;
      var date_de_soutenance = req.body.date_de_soutenance;
      var lieu = req.body.lieu;
      var impetrant = req.body.impetrant;
      var denomination = req.body.denomination;
      var contenu = req.body.contenu;
      var fichier = null;
      if (req.file) {
          fichier = req.file.filename;
      }

      models.AnnonceDeSoutenance.create({
          domaine,
          niveau,
          sujet,
          date_de_soutenance,
          lieu,
          impetrant,
          denomination,
          contenu,
          fichier
      }).then(annonce => {
          res.json({success: true, annonceId: annonce.id});
      }).catch(err => {
          res.json({success: false, message: err});
      });
  },
  editAnnonce: (req, res) => {
      var id = req.body.id;
      var domaine = req.body.domaine;
      var niveau = req.body.niveau;
      var sujet = req.body.sujet;
      var date_de_soutenance = req.body.date_de_soutenance;
      var lieu = req.body.lieu;
      var impetrant = req.body.impetrant;
      var denomination = req.body.denomination;
      var contenu = req.body.contenu;
      var fichier = null;
      if (req.file) {
          fichier = req.file.filename;
      }

      models.AnnonceDeSoutenance.findOne({
          where: {
              id: id
          }
      }).then(annonceFound => {
          annonceFound.update({
              domaine,
              niveau,
              sujet,
              date_de_soutenance,
              lieu,
              impetrant,
              denomination,
              contenu,
              fichier
          }).then(updated => {
              res.json({success: true, message: "L'annonce a été modifié avec succès"});
          }).catch(err => {
              res.json({success: false, message: err});
          });
      }).catch(err => {
          res.json({success: false, message: err});
      });
  },
  deleteAnnonce: (req, res) => {
      var id = req.params.id;
      models.AnnonceDeSoutenance.findOne({
          where: {
              id: id
          }
      }).then(annonceFound => {
          annonceFound.destroy().then(destroyed => {
              res.json({success: true, message: "L'annonce a été supprimé avec succès"});
          }).catch(err => {
              res.json({success: false, message: err});
          });
      }).catch(err => {
          res.json({success: false, message: err});
      });
  },
   getAnnonce: (req, res) => {
      models.AnnonceDeSoutenance.findAll().then(annonces => {
          if (annonces.length !== 0) {
              for (let i=0; i<annonces.length; i++) {
                  annonces[i].dataValues.date_de_soutenance = editDate(annonces[i].dataValues.date_de_soutenance);
              }
              res.json({success: true, annonces});
          }else {
              res.json({success: false, message: "Aucune annonce a été trouvé"});
          }
      }).catch(err => {
          res.json({success: false, message: err});
      })
   }
};