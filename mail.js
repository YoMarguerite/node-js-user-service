var nodemailer = require('nodemailer');
var config = require('./config-mail');

var str = {
    Connexion:"Vous venez de vous connecter à votre compte : ",
    Inscription:"Vous venez de vous inscrire : ",
    Modification:"Vous avez modifié votre compte : ",
    Suppression:"Vous avez supprimé votre compte : "
}

var mail = {
    send: function (subject, user) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.user,
                pass: config.pass
            }
        });

        var mailOptions = {
            from: config.user,
            to: user.mail,
            subject: subject+" : "+user.login,
            text: str[subject]+user.login
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};

module.exports = mail;