var models = require('../models');
var jwt = require('jsonwebtoken');
var auth = require('../config/auth');

module.exports = {
    addGpeDeRech: function(req, res) {
        jwt.verify(req.token,auth.secretKey,(err,authData)=>{
            if(err){
                res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
            }else {
                var denomination = req.body.denomination;
                var abreviation = req.body.abreviation;
                var tel = req.body.tel;
                var fax = req.body.fax;
                var email = req.body.email;
                var objectif = req.body.objectif;
                var mots_cles = req.body.mots_cles;
                var responsable = req.body.responsable;

                models.GroupeDeRecherche.findOne({
                    where: {
                        denomination: denomination
                    }
                }).then(gpeRechFound => {
                    if(gpeRechFound)
                        res.json({success: false, message: 'le groupe de recherche <<'+denomination+'>> existe'});
                    else {
                        models.GroupeDeRecherche.create({
                            denomination : denomination,
                            abreviation : abreviation,
                            tel : tel,
                            fax : fax,
                            email : email,
                            objectif : objectif,
                            mots_cles : mots_cles,
                            responsable : responsable
                        }).then(gpeDeRech=> {
                            res.json({success: true, gpeDeRechId: gpeDeRech.id});
                        }).catch(err=> {
                            res.json({success: false, message: 'erreur'+err});
                        });
                    }
                }).catch(err=> {
                    res.json({success: false, message: 'erreur'+err});
                });
            }
        });
    },

    editGpeDeRech: function(req, res) {
        jwt.verify(req.token,auth.secretKey,(err,authData)=>{
            if(err){
                res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
            }else {
                var id = req.body.id;
                var denomination = req.body.denomination;
                var abreviation = req.body.abreviation;
                var tel = req.body.tel;
                var fax = req.body.fax;
                var email = req.body.email;
                var objectif = req.body.objectif;
                var mots_cles = req.body.mots_cles;
                var responsable = req.body.responsable;

                models.GroupeDeRecherche.findOne({
                    where: {
                        id: id
                    }
                }).then(gpeRechFound => {
                    if(gpeRechFound)
                        gpeRechFound.update({
                            denomination : denomination,
                            abreviation : abreviation,
                            tel : tel,
                            fax : fax,
                            email : email,
                            objectif : objectif,
                            mots_cles : mots_cles,
                            responsable : responsable
                        }).then((updated)=> {
                            res.json({success: true, message: 'modification avec succée', updated})
                        }).catch(err=> {
                            res.json({success: false, message: 'erreur1: '+err})
                        });
                    else {
                        res.json({success: false, message: 'aucun groupe est tourvé'});
                    }
                }).catch(err=> {
                    res.json({success: false, message: 'erreur2: '+err});
                });
            }
        });
    },

    deleteGpeDeRech: function(req, res) {
        jwt.verify(req.token,auth.secretKey,(err,authData)=>{
            if(err){
                res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
            }else {
                var id = req.params.id; // id sent to specify the "article"
                var gpeDeRech = models.GroupeDeRecherche.findOne({
                    where: {
                        id: id
                    }
                }).then((gpeDeRech)=> {
                    gpeDeRech.destroy().then((deleted)=> {
                        res.json({success: true, message: 'le groupe de recherche a été supprimé avec succès',deleted});
                    }).catch((err)=>{
                        res.json({success: false, message: 'erreur lors de la suppression'});
                    });
                }).catch((err)=>{
                    res.json({success: false, message: 'groupe de recherche untrouvable'});
                });
            }
        });
    },

    getGpeDeRech: function(req, res) {
        models.GroupeDeRecherche.findAll().then(gpeDeRech=> {
            if(gpeDeRech.length !==0)
                res.json({success: true, gpeDeRech});
            else
                res.json({success: false, message: 'aucun article a été trouvé'});
        }).catch(err=> {
            res.json({success: false, message: 'erreur: '+err});
        });
    }
}