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

var myRouter = express.Router();

myRouter.route('/user')
    .get(function(req, res){
        sql.connectUser(req, res);
    })
    .post(function(req,res){
        sql.registerUser(req,res);
    })
    .put(function(req, res){
        sql.modifUser(req, res);
    })
    .delete(function(req,res){
        sql.deleteUser(req, res);
    })
 
app.use(myRouter);

app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port+"\n"); 
});