var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var auth = require('../config/auth');
var models = require('../models/index');
var dataToReturn = [
    "id",
    "nom",
    "prenom",
    "email",
    "domaine",
    "groupe_de_recherche",
    "specialite",
    "grade",
    "etablissement",
    "diplome_en_preparation",
    "tel"
]
module.exports = {

    addAuteur : function (req,res){
        jwt.verify(req.token,auth.secretKey,(err,authData)=>{
            if(err){
                res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
            }else {
                console.log(req.body);
                var nom= req.body.nom;
                var prenom= req.body.prenom;
                var domaine= req.body.domaine;
                var groupe_de_recherche= req.body.groupe_de_recherche;
                var specialite= req.body.specialite;
                var grade= req.body.grade;
                var etablissement= req.body.etablissement;
                var diplome_en_preparation=req.body.diplome_en_preparation;
                var tel= req.body.tel;
                var email=req.body.email;
                var auteur = models.Auteur.findOne({
                        where: {
                            email: email
                        }
                    }).then((auteurFound)=> {
                        console.log("iciiiiiiiiii")
                        console.log(auteurFound)
                        console.log("iciiiiiiiiii")
                        if(auteurFound){
                            res.json({success: 'fail', message: 'l\'auteur existe déja'});
                        }else {
                            bcrypt.hash(tel+email,10,(err,hashedPass)=> {
                                var auteur =  models.Auteur.create({
                                    nom: nom,
                                    prenom: prenom,
                                    domaine: domaine,
                                    groupe_de_recherche: groupe_de_recherche,
                                    specialite: specialite,
                                    grade: grade,
                                    etablissement: etablissement,
                                    diplome_en_preparation: diplome_en_preparation,
                                    tel: tel,
                                    email: email,
                                    mot_de_passe: hashedPass
                                }).then((auteur)=>{
                                    res.status(201).json({
                                        auteurId: auteur.id,
                                        authData
                                    });
                                }).catch((err)=> {
                                    res.send(err);
                                });
                            });
                        }
                    }).catch((err)=>{
                        res.json({err: err, message: 'error'});
                    });
                }
        });
    },
//Modifier un auteur
    editAuteur: function(req, res) {
        jwt.verify(req.token,auth.secretKey,(err,authData)=>{
            if(err){
                res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
            }else {
                var id = req.params.id; // id sent to specify the "auteur"
                var nom= req.body.nom;
                var prenom= req.body.prenom;
                var domaine= req.body.domaine;
                var groupe_de_recherche= req.body.groupe_de_recherche;
                var specialite= req.body.specialite;
                var grade= req.body.grade;
                var etablissement= req.body.etablissement;
                var diplome_en_preparation=req.body.diplome_en_preparation;
                var tel= req.body.tel;
                var email=req.body.email;
                var auteur = models.Auteur.findOne({
                    where: {
                        id: id
                    }
                }).then((auteurFound) => {
                    if(auteurFound) {
                        auteurFound.update({
                            nom: nom,
                            prenom: prenom,
                            domaine: domaine,
                            groupe_de_recherche: groupe_de_recherche,
                            specialite: specialite,
                            grade: grade,
                            etablissement: etablissement,
                            diplome_en_preparation: diplome_en_preparation,
                            tel: tel,
                            email: email
                        }).then((auteur)=> {
                            res.json({success: true, message: 'auteur modifier avec succès'});
                        }).catch((err)=> {
                            res.json({success: false, message: 'fail with error'+err.toString()});
                        });
                    }else {
                        res.json({success: false, message: 'aucun auteur trouvé'});
                    }
                });
            }
        });
    },
//supprimer un auteur
    deleteAuteur: function (req,res) {
        jwt.verify(req.token,auth.secretKey,(err,authData)=>{
            if(err){
                res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
            }else {
                var id = req.params.id; // id sent to specify the "auteur"
                var auteur = models.Auteur.findOne({
                    where: {
                        id: id
                    },
                    attributes: dataToReturn
                }).then((auteur)=> {
                    auteur.destroy().then((deleted)=> {
                        res.json({success: true, message: 'l\'auteur a été supprimé avec succès',deleted});
                    }).catch((err)=>{
                        res.json({success: false, message: 'erreur lors de la supression'});
                    });
                }).catch((err)=>{
                    res.json({success: false, message: 'auteur untrouvable'});
                });
            }
        });
    },
//obtenir un auteur selon son id s'il existe
    getAuteur: function(req,res) {
        var auteur = models.Auteur.findAll({
            attributes: dataToReturn
        }).then((auteurFound)=>{
            if(auteurFound.length !== 0) {
                res.json({success: true, auteurFound});
            }
            else {
                res.json({success: false ,message: "aucun auteur trouver"});
            }
        }); 
    },

//obtenir un auteur selon son id s'il existe
    getAuteurById: function(req,res) {
        var auteur = models.Auteur.findAll({
            attributes: dataToReturn,
            where: {
                id: req.params.id
            }
        }).then((auteurFound)=>{
            if(auteurFound.length !== 0) {
                res.json({success: true, auteurFound});
            }
            else {
                res.json({success: false ,message: "aucun auteur trouver"});
            }
        });
    },

//obtenir un auteur selon son NOM s'il existe
    getAuteurByName: function(req,res){
        var auteurs = models.Auteur.findAll({
            where: {
                nom: req.params.nom
            },
            attributes: dataToReturn
        }).then((auteurFound)=>{
            if(auteurFound.length !== 0) {
                res.json({success: true, auteurFound});
            }
            else {
                res.json({success: false ,message: "aucun auteur trouver"});
            }
        });
    },
//obtenir un/les auteur selon son groupe de recherche s'il existe
    getAuteurByGroupeRech: function(req,res){
        var auteurs = models.Auteur.findAll({
            where: {
                groupe_de_recherche: req.params.gpe_rech
            },
            attributes: dataToReturn
        }).then((auteurFound)=>{
            if(auteurFound.length !== 0) {
                res.json({success: true, auteurFound});
            }
            else {
                res.json({success: false ,message: "aucun auteur trouver"});
            }
        });
    },
//obtenir un/les auteur selon son email s'il existe
    getAuteurByGroupeRech: function(req,res){
        var auteurs = models.Auteur.findAll({
            where: {
                groupe_de_recherche: req.params.gpe_rech
            },
            attributes: dataToReturn
        }).then((auteurFound)=>{
            if(auteurFound.length !== 0) {
                res.json({success: true, auteurFound});
            }
            else {
                res.json({success: false ,message: "aucun auteur trouver"});
            }
        });
    },
//obtenir un/les auteur selon son groupe de recherche s'il existe
    getAuteurByEmail: function(req,res){
        var auteurs = models.Auteur.findAll({
            where: {
                email: req.params.email
            },
            attributes: dataToReturn
        }).then((auteurFound)=>{
            if(auteurFound.length !== 0) {
                res.json({success: true, auteurFound});
            }
            else {
                res.json({success: false ,message: "aucun auteur trouver"});
            }
        });
    },
//obtenir un/les auteur selon sa spec s'il existe
    getAuteurBySpecialite: function(req,res){
            var auteurs = models.Auteur.findAll({
                where: {
                    specialite: req.params.spec
                },
                attributes: dataToReturn
            }).then((auteurFound)=>{
                if(auteurFound.length !== 0) {
                    res.json(auteurFound);
                }
                else {
                    res.json({success:'faild' ,message: "aucun auteur trouver"});
                }
            });
    }
}
