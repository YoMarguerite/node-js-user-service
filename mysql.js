var mysql = require('mysql');
var passwordHash = require('password-hash');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sohcahtoa",
  database:"wibes"
});

const getUsers = "SELECT * FROM user;";
const getUserById = "SELECT * FROM user WHERE id = ?;";
const getUserByLogin = "SELECT * FROM user WHERE login=?;";
const insertUser = "INSERT INTO user (login, mail, pwd) VALUES (?,?,?);";
const updateUser = "UPDATE user SET login = ?, mail = ?, pwd = ? WHERE id = ?;";
const deleteUser = "DELETE FROM user WHERE id = ?;";

var sql = {

    connectUser: function (req, res) {
        var login = req.body.login;
        var pwd = req.body.pwd;
        con.query(getUserByLogin, [login], function (err, result) {
            if (err) throw err;
            if(result[0] != undefined){
                if(passwordHash.verify(pwd, result[0].pwd)){
                    res.json(result);
                }else{
                    res.json({"error":"Le mot de passe est incorrect..."});
                }
            }else{
                res.json({"error":"Le login n'existe pas..."})
            }

        });
    },

    registerUser: function (req, res) {
      var login = req.body.login;
      var mail = req.body.mail;
      var pwd = req.body.pwd;
      con.query(getUserByLogin, [login], function (err, result) {
          if (err) throw err;
          if(result[0] === undefined){
              con.query(insertUser, [login, mail, passwordHash.generate(pwd)], function(err, result) {
                  if (err) throw err;
                  res.json({id:result.insertId});
              });
          }else{
              res.json({error:"Ce login est déjà utilisé..."});
          }
      });
    },

    modifUser: function(req, res){
      var id = req.body.id;
      var login = req.body.login;
      var mail = req.body.mail;
      var pwd = req.body.pwd;
      con.query(getUserByLogin, [login], function (err, result) {
          if (err) throw err;
          if ((result[0] === undefined)||(result[0].id == id)) {
              con.query(updateUser, [login, mail, passwordHash.generate(pwd), id], function (err, result) {
                  if (err) throw err;
                  res.json(result);
              });
          } else {
              res.json({error: "Ce login est déjà utilisé..."});
          }
      });
    },

    deleteUser: function(req, res){
        var id = req.body.id;
        con.query(deleteUser, [id], function(err, result) {
            if (err) throw err;
            res.json(result)
        });
    }
}

module.exports = sql