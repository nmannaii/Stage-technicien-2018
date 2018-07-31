var express = require('express');
var auth = require('./config/auth');

//*****Controllers */
var auteurController = require('./controllers/auteurController');
var articleController = require('./controllers/articleController');
var gpeDeRechercheController = require('./controllers/gpeDeRechercheController');
var actualiteController = require('./controllers/actualiteController');
var animationScController = require('./controllers/animationScController');
//**Multer functions */
var uploadProfile = require('./storages').uploadProfile;
var uploadArticle = require('./storages').uploadArticle;
var uploadActualite = require('./storages').uploadActualite;


exports.router = (function(){
    var routesApi = express.Router();
    //auteur routes
    routesApi.route("/auteur/add").post(auth.verifyToken,uploadProfile.single('image'),auteurController.addAuteur);
    routesApi.route("/auteur/edit").post(auth.verifyToken,uploadProfile.single('image'),auteurController.editAuteur);
    routesApi.route("/auteur/delete/:id").delete(auth.verifyToken,auteurController.deleteAuteur);
    routesApi.route("/auteur").get(auteurController.getAuteur);
    routesApi.route("/auteur/id/:id").get(auteurController.getAuteurById);
    routesApi.route("/auteur/nom/:nom").get(auteurController.getAuteurByName);
    routesApi.route("/auteur/email/:email").get(auteurController.getAuteurByEmail);
    routesApi.route("/auteur/specialite/:spec").get(auteurController.getAuteurBySpecialite);
    routesApi.route("/auteur/gpe_rech/:gpe_rech").get(auteurController.getAuteurByGroupeRech);
    
    //article routes
    routesApi.route("/article/add").post(auth.verifyToken,uploadArticle.single('fichier'),articleController.addArticle);
    routesApi.route("/article/edit").post(auth.verifyToken,uploadArticle.single('fichier'),articleController.editArticle);
    routesApi.route("/article/delete/:id").delete(auth.verifyToken,articleController.deleteArticle);
    routesApi.route("/article/").get(articleController.getArticles);
    
    //groupe de recherche routes
    routesApi.route("/groupe_de_recherche/add").post(auth.verifyToken,gpeDeRechercheController.addGpeDeRech);
    routesApi.route("/groupe_de_recherche/edit").put(auth.verifyToken,gpeDeRechercheController.editGpeDeRech);
    routesApi.route("/groupe_de_recherche/delete/:id").delete(auth.verifyToken,gpeDeRechercheController.deleteGpeDeRech);
    routesApi.route("/groupe_de_recherche/").get(gpeDeRechercheController.getGpeDeRech);

    //actualite routes
    routesApi.route("/actualite/add").post(auth.verifyToken,uploadActualite.single('image'),actualiteController.addActulite);
    routesApi.route("/actualite/edit").post(auth.verifyToken,uploadActualite.single('image'),actualiteController.editActualite);
    routesApi.route("/actualite/delete/:id").delete(auth.verifyToken,actualiteController.deleteActualite);
    routesApi.route("/actualite/").get(actualiteController.getActualite);
    routesApi.route("/actualite/id/:id").get(actualiteController.getActualiteById);

   //animation scientifique
    routesApi.route("/animation_sc/add").post(auth.verifyToken,animationScController.addAnimationSc);
    routesApi.route("/animation_sc/edit").put(auth.verifyToken,animationScController.editAnimation);
    routesApi.route("/animation_sc/delete/:id").delete(auth.verifyToken,animationScController.deleteAnimation);
    routesApi.route("/animation_sc/").get(animationScController.getAnimation);

    //download route
    routesApi.route("/download/:type/:filename").get((req, res)=>{
        var filename = req.params.filename;
        var type = req.params.type;
        res.sendfile(__dirname+"/uploades/"+type+"/"+filename);
    });
    
    //login admin
    routesApi.route("/admin/login").post(auth.signIn);
    return routesApi;
})();