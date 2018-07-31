const jwt = require('jsonwebtoken');
const models = require('../models');
const auth = require('../config/auth');
const editDate = require('./editDate');
module.exports = {
  addAnimationSc : (req, res) => {
      jwt.verify(req.token, auth.secretKey, (err, authData) => {
          if (err) {
              res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
          } else {
              var denomination = req.body.denomination;
              var description = req.body.description;
              var date = req.body.date;
              var lieu = req.body.lieu;
              models.AnimationScientifique.create({
                  denomination: denomination,
                  description: description,
                  date: date,
                  lieu: lieu
              }).then(animation => {
                  res.json({success: true, animationId: animation.id});
              }).catch(err => {
                  res.json({success: false, message: "erreur lors la création de l'animation."});
              });
          }
      });
  },
  editAnimation: (req, res) => {
      jwt.verify(req.token, auth.secretKey, (err, authData) => {
          if (err) {
              res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
          } else {
              var id = req.body.id;
              var denomination = req.body.denomination;
              var description = req.body.description;
              var date = req.body.date;
              var lieu = req.body.lieu;
              models.AnimationScientifique.findOne({
                  where: {
                      id: id
                  }
              }).then(animationFound => {
                  animationFound.update({
                      denomination: denomination,
                      description: description,
                      date: date,
                      lieu: lieu
                  }).then(updated => {
                      res.json({success: true, message: "L'animation a été modifié avec succès"});
                  }).catch(err => {
                      res.json({success: false, message: err});
                  })
              }).catch(err => {
                  res.json({success: false, message: err});
              })
          }
      });
  },
  deleteAnimation: (req, res) => {
      jwt.verify(req.token, auth.secretKey, (err, authData) => {
          if (err) {
              res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
          } else {
              var id = req.params.id;
              models.AnimationScientifique.findOne({
                  where: {
                      id: id
                  }
              }).then(animationFound => {
                  animationFound.destroy()
                      .then(destroyed => {
                          res.json({success: true, message: "L'animation a été supprimé avec succès"});
                      })
                      .catch(err => {
                          res.json({success: false, message: err});
                      });
              }).catch(err => {
                  res.json({success: false, message: err});
              });
          }
      });
  },
  getAnimation: (req, res) => {
      models.AnimationScientifique.findAll()
      .then(animations => {
         if (animations.length !== 0) {
             for(let i = 0; i<animations.length; i++) {
                 animations[i].dataValues.date = editDate(animations[i].dataValues.date);
             }
             res.json({success: true, animations});
         } else {
             res.json({success: false, message: "Aucune animation scientifique a été trouvé"});
         }
      })
      .catch(err => {
          res.json({success: false, message: err});
      });
  }
};