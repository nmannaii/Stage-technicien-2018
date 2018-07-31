var express = require("express");
var bodyParser = require("body-parser");
var routesApi = require("./routesApi").router;
const port = process.env.PORT || 3000;
//app

var app = express();

//body-parser conf
app.use(bodyParser.urlencoded({extended: true,}));
app.use(bodyParser.json());
//CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//use routesApi

app.use('/api/',routesApi);
//start serveer
app.listen(port,()=> {
    console.log("Server Start on port "+port+"....");
})