const User = require('../models/').User;
const Posting = require('../models/').Posting;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const {or, and, gt, lt} = Sequelize.Op;

console.log(User);

module.exports = {

    /**
     * /api/login
     * {
     *  user: "user1",
     *  password: "user1"
     * }
     */

    // username, password
    login(req, res) {
        console.log("req.body:");
        console.log(req.body);
        console.log("attempting to login");

        // verify the user's login information
        let errMsg = "Username/email and password does not match.";

        return User
            .findOne({
                where: {
                    [or]: {
                        email: req.body.user,
                        username: req.body.user
                    }
                }
            })
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "Can not find user with username/email: " + req.body.user
                    })
                } else {

                    // verify the password of the user
                    let plainTextPassword = req.body.password;
                    let passwordHash = user.password
                    bcrypt.compare(plainTextPassword, passwordHash, function(err, result) {

                        if(err) {
                            console.log(err);
                            return res.status(400).send(err);
                        }

                        // add { expiresIn: '1h' } as 3rd param to set the token to expire
                        if(result == true) {
                            jwt.sign({user}, 'secretkey', (err, token) => {
                                if(err) {
                                    console.log(err);
                                    return res.status(400).send(err);
                                }

                                let response = user.dataValues;
                                response.token = token;
                                return res.send(response);
                            });
                        } else {
                            return res.status(404).send({
                                message: errMsg
                            })                     
                        } 
                    });
                }
            })
            .catch((error) => {
                console.log("Opps we ran into an error");
                console.log(error);
                res.status(400).send(error);
            })

        return
    },

    signout(req, res) {
        console.log("signing out");
    },

    // Verify Token
    verifyToken(req, res, next) {
        // Get auth header value (token)
        // console.log(req);
    
        const bearerHeader = req.headers['authorization'];
    
        let errMsg = "Authorization token invalid, you are not authorized to access this endpoint."
    
        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;

            jwt.verify(req.token, 'secretkey', (err, authData) => {
                if(err) {
                    // Forbidden
                    res.status(403).json({
                        message: errMsg
                    });
                } else {
                    // Next middleware, user verified, process the request
                    // console.log("authData", authData);
                    // console.log("user", authData.user)
                    req.body.validatedUser = authData.user;
                    
                    console.log("validatedUser", req.body.validatedUser);

                    next();
                }
            });  
        } else {
            // Forbidden
            res.status(403).json({
                message: errMsg
            });
        }
    },

    checkToken(req, res) {
        let token = req.body.token;

        let errMsg = "This token is invalid";
        
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
                // Forbidden
                res.status(403).send({
                    message: errMsg
                });
            } else {
                console.log(authData);
                res.send(authData.user);
            }
        }); 
    },

    onlyAdminMiddleware(req, res, next) {
        if(req.body.validatedUser.role != "admin") {
            res.status(403).send({message: "forbidden, need to be admin"})
        } else {
            next();
        }
    },

    postingAdminUserCheck(user, posting) {
        if(user.role != "admin" && posting.userId != user.id) {
            res.status(403).send({message: "forbidden, need to be the posting owner or admin"});
            return false;
        }
        return true;
    },

    postingAdminUserBuyerCheck(user, posting) {
        if(user.role != "admin" && posting.userId != user.id && posting.buyerId != user.id) {
            res.status(403).send({message: "forbidden, need to be the posting owner, buyer or admin"});
            return false;
        }
        return true;
    },

    userAdminUserCheck(validatedUser, userId) {
        if(validatedUser.id != userId && validatedUser.role != admin) {
            res.status(403).send({message: "forbidden, need to be the account owner or admin"});
            return false;
        }
        return true;
    }


}