var multer = require('multer');

const storageArticle = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploades/articles/');
    },
    filename: function(req, file, cb) {
        var date = new Date().toISOString().replace(/:/g, '-')
        cb(null, date+" "+file.originalname);
    } 
});
const storageProfile = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploades/profiles/');
    },
    filename: function(req, file, cb) {
        var date = new Date().toISOString().replace(/:/g, '-')
        cb(null, date+" "+file.originalname);
    } 
});
const storageActualite = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploades/actualites/');
    },
    filename: function(req, file, cb) {
        var date = new Date().toISOString().replace(/:/g, '-')
        cb(null, date+" "+file.originalname);
    } 
});
const uploadArticle = multer({storage: storageArticle});
const uploadProfile = multer({storage: storageProfile});
const uploadActualite = multer({storage: storageActualite});
module.exports = {
    uploadArticle,
    uploadProfile,
    uploadActualite
}