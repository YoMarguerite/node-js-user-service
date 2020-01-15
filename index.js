var express = require('express');
var bodyParser = require('body-parser');
var sql = require("./mysql.js");

var app = express();
const expressSwagger = require('express-swagger-generator')(app);
var hostname = 'localhost'; 
var port = 3000; 

let options = {
    swaggerDefinition: {
        info: {
            description: 'Here you can find the documentation of this microservice',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['index.js'] //Path to the API handle folder
};
expressSwagger(options)


app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

var myRouter = express.Router();


myRouter.route('/login')
    /**
     * get all users
     * @route GET /login get all users
     * @group Login - Use for sign in
     * @returns {object} 200 - return all user, test route
     */
    .get(function(req, res){
        sql.getUsers(req, res).
            catch((err) => {
                console.log(err);
            })
    })
    /**
     * connect an user
     * @route POST /login connect an user
     * @group Login - Use for sign in
     * @param {string} login - user's login
     * @param {string} pwd - user's password
     * @returns {object} 200 - return user's data
     *                         |_ if login doesn't exist, return object with a message error 
     *                         |_ if password is incorrect, return object with a message error
     *                         |_ if login or password typeof !== 'string', return object with a message error
     *                         |_ Unexpected error
     */
    .post(function(req, res){
        sql.connectUser(req, res).
        catch((err) => {
            console.log(err);
        })
    })

myRouter.route('/user')

    /**
     * Use to manage user account
     * @route POST /user create a new user
     * @group User - Use to manage user account
     * @param {string} login - user's login
     * @param {string} pwd - user's password
     * @param {string} mail - user's mail
     * @returns {object} 200 - return user's id
     *                         |_ if login already exist, return object with a message error
     *                         |_ Unexpected error
     */
    .post(function(req,res){
        sql.registerUser(req,res).
            catch((err)=>{
                console.log(err);
            });
    })

    /**
     * Use to manage user account
     * @route PUT /user modify an user
     * @group User - Use to manage user account
     * @param {string} id - user's id
     * @param {string} login - user's login
     * @param {string} pwd - user's password
     * @param {string} mail - user's mail
     * @returns {object} 200 - return object with number of affected rows
     *                         |_ if login already exist, return object with a message error
     *                         |_ Unexpected error
     */
    .put(function(req, res){
        sql.modifUser(req, res).
            catch((err) => {
                console.log(err);
            });
    })

    /**
     * Use to manage user account
     * @route DELETE /user delete an user
     * @group User - Use to manage user account
     * @param {string} id - user's id
     * @returns {object} 200 - return object with number of affected rows
     *                         |_ Unexpected error
     */
    .delete(function(req,res){
        sql.deleteUser(req, res).
            catch((err) => {
                console.log(err)
            })
    })
 
app.use(myRouter);

app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port+"\n"); 
});

module.exports = app;