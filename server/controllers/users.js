const User = require('../models/').User;
const Posting = require('../models/').Posting;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const {or, and, gt, lt} = Sequelize.Op;
require('./auth');

module.exports = {

    // create new user
    create(req, res) {
        console.log("req.body:");
        console.log(req.body);

        let password = req.body.password;
        let saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err || !hash) {
                    res.status(400).send(err.message);
                } else {
                    console.log("hash:");
                    console.log(hash);

                    // save hash into the database;
                    User
                        .create({
                            email: req.body.email,
                            username: req.body.username,
                            password: hash,
                            role: "user"
                        })
                        .then((user) => {
                            console.log("Created a new user");
                            // console.log(user);
                            let successRes = user.dataValues;
                            res.status(201).send(successRes);
                        })
                        .catch((error) => {
                            console.log("Failed to create a new user");
                            console.log(error);
                            res.status(400).send(error)
                        })
                }
            });
        });

        return
    },

    //
    read(req, res) {

        if(req.body.validatedUser.role != "admin") {
            res.status(403).send({message:"forbiddden"});
        }

        return User
            .findAll()
                .then((users) => {
                    console.log("Here are all of the users:");
                    console.log(users);
                    return res.send(users);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },

    update(req, res) {

        let id = parseInt(req.body.id);

        // validate endpoint
        if(!userAdminUserCheck(req.body.validatedUser, id)) {
            return;
        }

        return User
            .findById(id)
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: `user with id: ${id} not found.`
                        })
                    } else {
                        return user
                            .update({
                                email: req.body.email || user.email,
                                username: req.body.username || user.username,
                                password: req.body.password || user.password,
                                phone: req.body.phone || user.phone,
                                crypto: req.body.crypto || user.crypto,
                                rating: req.body.rating || user.rating
                            })
                            .then(() => {
                                console.log("Successfully updated user");
                                res.send(user);
                            })
                            .catch((error) => {
                                console.log("Opps we ran into an error");
                                console.log(error);
                                res.status(400).send(error);
                            })
                    }
                })
                .catch((error) => {
                    console.log("Opps we ran into an error");
                    console.log(error);
                    res.status(400).send(error);
                })

    },

    delete(req, res) {
        let id = parseInt(req.body.id);

        // validate endpoint
        if(!userAdminUserCheck(req.body.validatedUser, id)) {
            return;
        }

        return User
            .findById(id)
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: `user with id: ${id} not found.`
                        })
                    } else {
                        return user
                            .destroy()
                            .then(() => {
                                let msg = `user with id: ${id} destroyed.`
                                console.log(msg);
                                res.send(user);

                            })
                            .catch(error => {
                                console.log("Opps, we have encountered an error");
                                console.log(error);
                                res.status(400).send(error)
                            });
                    }
                })
                .catch(error => {
                    console.log("Opps, we have encountered an error");
                    console.log(error);
                    res.status(400).send(error)
                });
    },

    findById(req, res) {
        let id = parseInt(req.params.id);

        return User
            .findById(id)
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: `user with id: ${id} not found.`
                        })
                    } else {
                        return res.send(user)
                    }
                })
                .catch(error => {
                    console.log("Opps, we have encountered an error");
                    console.log(error);
                    res.status(400).send(error)
                });
    },

    deleteAll(req, res) {
        return user
            .destroy({
                where: {

                },
                truncate: true
            })
                .then((rowsDeleted) => {

                    console.log(rowsDeleted);

                    console.log("rowsDeleted = " + resolve(rowsDeleted));

                    return res.send("Successfully deleted " + rowsDeleted + " rows.");
                })
                .catch((error) => {
                    return res.status(400).send(error);
                })
    },

    findBoughtPostsByUserId(req, res) {
        let id = parseInt(req.params.id);

        return User
            .findOne({
                where: {
                    id: id
                },
                include: [{
                    model: Posting,
                    as: 'boughtPosts',
                    where: {
                        buyerId: id
                    },
                    required: false
                }]
            }, )
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: `user with id: ${id} not found.`
                        })
                    } else {
                        return res.send(user)
                    }
                })
                .catch(error => {
                    console.log("Opps, we have encountered an error");
                    console.log(error);
                    res.status(400).send(error)
                });
    },

    // check if the user exists in our database
    isExistingUser(req, res, next) {

        User.findAll({
            where: {
                [or]: {
                    email: req.body.email,
                    username: req.body.username
                }
            }
        })
        .then((users) => {

            console.log(users);

            if(users.length > 0) {
                return res.status(400).json({
                    message: "Another user already exists with that username or email, please try again."
                });
            } else {
                next();
            }
        })
        .catch(err => {
            return res.status(400).send(err);
        })

    },

    isValidUpdate(req, res, next) {
        let id = parseInt(req.body.id);

        obj = this;

        User.findById(id)
            .then(user => {
                if(req.body.username != user.username  || req.body.email != user.email) {
                    if(req.body.username != user.username) {
                        // check if there is a conflict in the database
                        User.findAll({
                            where: {
                                [or]: {
                                    email: req.body.email,
                                    username: req.body.username
                                }
                            }
                        })
                        .then((users) => {

                            console.log(users);

                            if(users.length > 0) {
                                return res.status(400).json({
                                    message: "Another user already exists with that username or email, please try again."
                                });
                            } else {
                                next();
                            }
                        })
                        .catch(err => {
                            return res.status(400).send(err);
                        })

                    }

                } else {
                    next();
                }
            })
    },

    // get all posts that belong to the user or the user is a buyer
    transactionHistory(req, res) {

        let id = parseInt(req.params.userId);
        if(id != parseInt(req.body.validatedUser.id) && req.body.validatedUser.role != "admin") {
            return res.status(403).send({message: "Forbidden"})
        }

        Posting.findAll({
            where: {
                [or]: {
                    buyerId: id,
                    userId: id
                },
                [or]: [
                    {status: "fulfilled"},
                    {status: "cancelled"},
                    {status: "disputing"}
                ]
            },
            include: [{
                model: User,
                as: "User"
            },
            {
                model: User,
                as: "Buyer"
            }]
        }).then(postings => {
            res.send(postings);
        })
        .catch(err => {
            res.status(400).send(err);
        })
    }
}
