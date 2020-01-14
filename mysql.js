var mysql = require('mysql');
var passwordHash = require('password-hash');
var sendMail = require('./mail');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sohcahtoa",
  database:"wibes"
});

const getUserByLogin = "SELECT * FROM user WHERE login=?;";
const insertUser = "INSERT INTO user (login, mail, pwd) VALUES (?,?,?);";
const updateUser = "UPDATE user SET login = ?, mail = ?, pwd = ? WHERE id = ?;";
const deleteUser = "DELETE FROM user WHERE id = ?;";

var sql = {

    connectUser: function (req, res) {
        try{
            let login = req.body.login;
            let pwd = req.body.pwd;
            if(typeof login === 'string' && typeof pwd === 'string'){
                con.query(getUserByLogin, [login], function (err, result) {
                    try{
                        if(result[0] != undefined){
                            if(passwordHash.verify(pwd, result[0].pwd)){
                                res.json(result);
                                sendMail.send("Connexion", {login:login, mail:result[0].mail});
                            }else{
                                res.json({error:"Le mot de passe est incorrect..."});
                            }
                        }else{
                            res.json({error:"Le login n'existe pas..."})
                        }
                    }catch(err){
                        res.json({error:err})
                    }
                });
            }else{
                res.json({error:"Les paramètres login et pwd sont invalides..."})
            }
        }catch(err){
            res.json({error:err})
        }
    },

    registerUser: function (req, res) {
        try{
            let login = req.body.login;
            let mail = req.body.mail;
            let pwd = req.body.pwd;
            con.query(getUserByLogin, [login], function (err, result) {
                try{
                    if(result[0] === undefined){
                        con.query(insertUser, [login, mail, passwordHash.generate(pwd)], function(err, result) {
                            if (err) throw err;
                            res.json({id:result.insertId});
                            sendMail.send("Inscription", {login:login, mail:mail});
                        });
                    }else{
                        res.json({error:"Ce login est déjà utilisé..."});
                    }
                }catch(err){
                    res.json({error:err})
                }
            });
        }catch(err){
            res.json({error:err})
        }
    },

    modifUser: function(req, res){
        try{
            let id = req.body.id;
            let login = req.body.login;
            let mail = req.body.mail;
            let pwd = req.body.pwd;
            con.query(getUserByLogin, [login], function (err, result) {
                try{
                    if ((result[0] === undefined)||(result[0].id == id)) {
                        con.query(updateUser, [login, mail, passwordHash.generate(pwd), id], function (err, result) {
                            if (err) throw err;
                            res.json(result);
                            sendMail.send("Modification", {login:login, mail:mail});
                        });
                    } else {
                        res.json({error: "Ce login est déjà utilisé..."});
                    }
                }catch(err){
                    res.json({error:err})
                }
            });
        }catch(err){
            res.json({error:err})
        }
    },

    deleteUser: function(req, res){
        try{
            let id = req.body.id;
            con.query(deleteUser, [id], function(err, result) {
                try{
                    res.json(result)
                }catch(err){
                    res.json({error:err})
                }
            });
        }catch(err){
            res.json({error:err})
        }
    }
}

module.exports = sql