var express = require('express');
var router = express.Router();
var passport = require('passport');
var {User} = require('../db/models/UserSchema');
var jwt = require('jsonwebtoken');
var config = require('./config');




    // protected route by web token - Example
    router.post('/' , function(req, res) {

        var token = req.body.token; // taking the token we passed in the request
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' }); // send 401 if there is no token provided
    
        jwt.verify(token, config.JWTsecret, function(err, decoded) { // using the token we passed to authonticate the account
            if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' }); // if the token wrong send 401 status

            // if auth was successful
            res.send('auth success')
        })
    });
    


module.exports = router;