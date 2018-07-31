var fs = require('fs');
var jwt = require('jsonwebtoken');
var admin = require('./adminConf');
var secretKey = fs.readFileSync('./config/secretKey.txt',{encoding: 'utf8'});


module.exports = {
    secretKey: secretKey,

    signIn: function signIn(req, res){
        var password = req.body.password;
        var login = req.body.login;
        if(password === admin.password && login  === admin.login) {
            jwt.sign({admin}, secretKey,(err, token)=> {
                if(err) throw(err)
                res.json({authorized: true,token});
            });
        }else {
            res.json({authorized: false, message: "mot de passe ou login est erroné"});
        }
    },
    
    verifyToken: function verifyToken(req, res, next) {
        const bearerHeader  = req.headers['authorization']//get bearer header

        if(bearerHeader!= undefined) {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            req.token = token;
            next();
        }else {
            res.json({success: false, message: "vous n'êtes pas autorisé"});
        }
    }
}