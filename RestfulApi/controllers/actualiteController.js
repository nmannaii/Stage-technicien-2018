var models = require('../models');
var jwt = require('jsonwebtoken');
var auth = require('../config/auth');

module.exports = {
    addActulite: function (req, res) {
        jwt.verify(req.token, auth.secretKey, (err, authData) => {
            if (err) {
                res.json({ success: false, message: 'vous n\'êtes pas autorisé!' });
            } else {
                var denomination = req.body.denomination;
                var contenu = req.body.contenu;
                var image = null;
                if (req.file) {
                    image = req.file.filename;
                }
                models.Actualite.create({
                    denomination: denomination,
                    contenu: contenu,
                    image: image
                }).then((createdAct) => {
                    res.json({ success: true, actualiteId: createdAct.id });
                }).catch((err) => {
                    res.json({ success: false, message: "erreur lors la création d'actualité" });
                });
            }
        });
    },
    editActualite: function (req, res) {
        jwt.verify(req.token, auth.secretKey, (err, authData) => {
            if (err) {
                res.json({ success: false, message: 'vous n\'êtes pas autorisé!' });
            } else {
                var id = req.body.id;
                var denomination = req.body.denomination;
                var contenu = req.body.contenu;
                var image = req.body.image;
                if (req.file) {
                    image = req.file.filename;
                }
                models.Actualite.findOne({
                    where: {
                        id: id
                    }
                }).then(foundAct => {
                    if (foundAct) {
                        foundAct.update({
                            denomination: denomination,
                            contenu: contenu,
                            image: image
                        }).then((editedAct) => {
                            res.json({ success: true, message: "Actualité a été modifié avec succès" });
                        }).catch(err => {
                            res.json({ success: false, message: "erreur: " + err });
                        })
                    } else {
                        res.json({ success: false, message: "Aucune actualité a été trouvé" });
                    }
                })
            }
        });
    },
    deleteActualite: function (req, res) {
        jwt.verify(req.token, auth.secretKey, (err, authData) => {
            if (err) {
                res.json({ success: false, message: 'vous n\'êtes pas autorisé!' });
            } else {
                var id = req.params.id;
                models.Actualite.findOne({
                    where: {
                        id: id
                    }
                }).then(foundAct => {
                    foundAct.destroy().then(deleted=>{
                        res.json({success: true, message: "L'actualité a été supprimé avec succès"});
                    }).catch(err=>{
                        res.json({success: false, message: "erreur lors de la suppression"});
                    }).catch(err=>{
                        res.json({success: false, message: "actualité untrouvable"});
                    });
                })
            }
        });
    },
    getActualite: function(req,res){
        models.Actualite.findAll()
        .then(actualites=>{
            if(actualites.length!==0){
                res.json({success: true, actualites});
            }else{
                res.json({success: false, message: "aucune actualité a été trouvé"});
            }
        }).catch(err=>{
            res.json({success: false, message: "erreur: "+err});
        });
    },
    getActualiteById: function(req,res){
        var id = req.params.id;
        models.Actualite.findOne({
            where: {
                id: id
            }
        }).then(actualites=>{
            if(actualites){
                res.json({success: true,actualites});
            }else{
                res.json({success: false, message: "aucune actualité a été trouvé"});
            }
        }).catch(err=>{
            res.json({success: false, message: "erreur: "+err});
        });
    }
}

