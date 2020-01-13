var express = require('express');
var bodyParser = require('body-parser');
var sql = require("./mysql.js");

var app = express();
var hostname = 'localhost'; 
var port = 3000; 

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var myRouter = express.Router();

myRouter.route('/login')
    .post(function(req, res){
        try{
            sql.connectUser(req, res);
        }catch(err){
            console.log(err);
        }
    })

myRouter.route('/user')
    .post(function(req,res){
        try{
            sql.registerUser(req,res);
        }catch(err){
            console.log(err)
        }
    })
    .put(function(req, res){
        try{
            sql.modifUser(req, res);
        }catch(err){
            console.log(err)
        }
    })
    .delete(function(req,res){
        try{
            sql.deleteUser(req, res);
        }catch(err){
            console.log(err)
        }
    })
 
app.use(myRouter);

app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port+"\n"); 
});