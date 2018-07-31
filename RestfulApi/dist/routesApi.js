var express = require('express');
var auth = require('./config/auth');
var auteurController = require('./controllers/auteurController');
var articleController = require('./controllers/articleController');
var gpeDeRechercheController = require('./controllers/gpeDeRechercheController');
var key = "hello";
exports.router = (function(){
    var routesApi = express.Router();
    //auteur routes
    routesApi.route("/auteur/add").post(auth.verifyToken,auteurController.addAuteur);
    routesApi.route("/auteur/edit/:id").post(auth.verifyToken,auteurController.editAuteur);
    routesApi.route("/auteur/delete/:id").post(auth.verifyToken,auteurController.deleteAuteur);
    routesApi.route("/auteur").get(auteurController.getAuteur);
    routesApi.route("/auteur/id/:id").get(auteurController.getAuteurById);
    routesApi.route("/auteur/nom/:nom").get(auteurController.getAuteurByName);
    routesApi.route("/auteur/email/:email").get(auteurController.getAuteurByEmail);
    routesApi.route("/auteur/specialite/:spec").get(auteurController.getAuteurBySpecialite);
    routesApi.route("/auteur/gpe_rech/:gpe_rech").get(auteurController.getAuteurByGroupeRech);
    
    //article routes
    routesApi.route("/article/add").post(auth.verifyToken,articleController.addArticle);
    routesApi.route("/article/edit/:id").post(auth.verifyToken,articleController.editArticle);
    routesApi.route("/article/delete/:id").post(auth.verifyToken,articleController.deleteArticle);
    routesApi.route("/article/").get(articleController.getArticles);
    
    //groupe de recherche routes
    routesApi.route("/groupe_de_recherche/add").post(auth.verifyToken,gpeDeRechercheController.addGpeDeRech);
    routesApi.route("/groupe_de_recherche/edit/:id").post(auth.verifyToken,gpeDeRechercheController.editGpeDeRech);
    routesApi.route("/groupe_de_recherche/delete/:id").post(auth.verifyToken,gpeDeRechercheController.deleteGpeDeRech);
    routesApi.route("/groupe_de_recherche/").get(gpeDeRechercheController.getGpeDeRech);

    //actualite routes
    
    
    //login admin
    routesApi.route("/admin/login").post(auth.signIn);
    return routesApi;
})();