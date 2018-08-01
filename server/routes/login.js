var express = require('express');
var router = express.Router();
var passport = require('passport');
var {User} = require('../db/models/UserSchema');
var jwt = require('jsonwebtoken');
var config = require('./config');




    router.post('/' ,passport.authenticate('local'), function(req, res) {
        User.findOneAndUpdate(
            {username: req.body.username}, 
            {login:true},
            {new:true},
            (err, userAcc) => {
                if (err) {
                    console.log('err', err)
                    res.send(err)
                } else if (req.user) {

                    // generating login token
                    var token = jwt.sign({
                        email: req.body.email, 
                        hash: req.user.hash,
                        salt: req.user.salt
                    }, config.JWTsecret, {}); // assigning token which be userd to activate the signed account
                    
                    res.send({msg:'you logged in', user:req.user, token:token})
                } 
            }
        );
    });
    


module.exports = router;