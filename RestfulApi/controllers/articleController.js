var models = require('../models');
var jwt = require('jsonwebtoken');
var auth = require('../config/auth');

module.exports =  {
    addArticle: function(req, res) {
        jwt.verify(req.token,auth.secretKey,(err,authData)=>{
            if(err){
                res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
            }else {
                var denomination= req.body.denomination;
                var numero= req.body.numero;
                var volume= req.body.volume;
                var date_de_parution= req.body.date_de_parution;
                var mot_cle= req.body.mot_cle;
                var resume= req.body.resume;
                var pages= req.body.pages;
                var auteurs= req.body.auteurs;
                var domaine= req.body.domaine;
                var revue_scientifique= req.body.revue_scientifique;
                var fichier= null;
                if(req.file){
                    fichier = req.file.filename
                }
                var article = models.Article.create({
                    denomination: denomination,
                    numero: numero,
                    volume: volume,
                    date_de_parution: date_de_parution,
                    mot_cle: mot_cle,
                    resume: resume,
                    pages: pages,
                    auteurs: auteurs,
                    domaine: domaine,
                    revue_scientifique: revue_scientifique,
                    fichier: fichier
                }).then((createdArticle)=> {

                    res.json({success: true, articleId: createdArticle.id});
                }).catch((err)=> {
                    res.json({success: false, message: "fail to create"});
                });
            }
        });
    },
    editArticle: function(req, res) {
        jwt.verify(req.token,auth.secretKey,(err,authData)=>{
            if(err){
                res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
            }else {
                var id = req.body.id;
                var denomination= req.body.denomination;
                var numero= req.body.numero;
                var volume= req.body.volume;
                var date_de_parution= req.body.date_de_parution;
                var mot_cle= req.body.mot_cle;
                var resume= req.body.resume;
                var pages= req.body.pages;
                var auteurs= req.body.auteurs;
                var domaine= req.body.domaine;
                var revue_scientifique= req.body.revue_scientifique;
                var fichier= null;
                if(req.file){
                    fichier = req.file.filename
                }else{
                    fichier = req.body.fichier
                }
                var article = models.Article.findOne({
                    where: {
                        id: id
                    }
                }).then(articleFound=> {
                    if(articleFound){
                        articleFound.update({
                            denomination: denomination,
                            numero: numero,
                            volume: volume,
                            date_de_parution: date_de_parution,
                            mot_cle: mot_cle,
                            resume: resume,
                            pages: pages,
                            auteurs: auteurs,
                            domaine: domaine,
                            revue_scientifique: revue_scientifique,
                            fichier: fichier
                        }).then((articleUpdate)=> {
                            res.json({success: true, message: 'article modifié avec succès', articleUpdate});
                        }).catch(err=>{
                            res.json({success: false, message: 'fail with error'+err.toString()});
                        });
                    }else {
                        res.json({success: false, message: 'aucun article trouvé'});
                    }
                });
            }
        });
    },
    deleteArticle: function(req,res) {
        jwt.verify(req.token,auth.secretKey,(err,authData)=>{
            if(err){
                res.json({success: false, message: 'vous n\'êtes pas autorisé!'});
            }else {
                var id = req.params.id; // id sent to specify the "article"
                var article = models.Article.findOne({
                    where: {
                        id: id
                    }
                }).then((article)=> {
                    article.destroy().then((deleted)=> {
                        res.json({success: true, message: 'l\'article a été supprimé avec succès',deleted});
                    }).catch((err)=>{
                        res.json({success: false, message: 'erreur lors de la suppression'});
                    });
                }).catch((err)=>{
                    res.json({success: false, message: 'article untrouvable'});
                });
            }
        });
    },
    getArticles: function(req,res) {
        models.Article.findAll().then(articles=> {
            if(articles.length !==0)
                res.json({success: true, articles});
            else
                res.json({success: false, message: 'aucun article a été trouvé'});
        }).catch(err=> {
            res.json({success: fail, message: 'erreur: '+err});
        });
    }
}