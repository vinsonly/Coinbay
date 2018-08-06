const Posting = require('../models/').Posting;
const User = require('../models/').User;
const verifyToken = require('./auth').verifyToken;
const Op = require('sequelize').Op;
// const Op = sequelize.Op;


var db = require('../models');
var sequelize = db.sequelize;

// var getWeb3 = require('../../utils/getWeb3');

// var BasicEscrow = require('../eth/build/contracts/BasicEscrow.json');

module.exports = {
    // define your route handlers here, see below for details

    create(req, res) {

        let obj = {
            postingTitle: req.body.postingTitle,
            modelName: req.body.modelName,
            brand: req.body.brand,
            category: req.body.category,
            price: req.body.price,
            status: "active",
            images: req.body.images,
            description: req.body.description,
            abstract: req.body.abstract,
            location: req.body.location,
            userId: req.body.validatedUser.id
        }

        if(req.body.id) {
            obj.id = req.body.id
        }

        return Posting
            .create(obj)
            .then((posting) => {
                console.log("Created a new posting");
                console.log(posting);
                res.status(201).send(posting);
            })
            .catch((error) => {
                console.log("Failed to create a new posting");
                console.log(error);
                res.status(400).send(error)
            })
    },

    read(req, res) {
        return Posting
            .findAll()
                .then((postings) => {
                    console.log("Here are all of the postings:");
                    console.log(postings);
                    return res.send(postings);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },

    update(req, res) {

        let id = parseInt(req.body.id);
        console.log(req.body);

        return Posting
            .findById(id)
                .then(posting => {
                    if(!posting) {
                        return res.status(404).send({
                            message: `posting with id: ${id} not found.`
                        })
                    } else {
                        return posting
                            .update({
                                postingTitle: req.body.postingTitle || posting.postingTitle,
                                modelName: req.body.modelName || posting.modelName,
                                brand: req.body.brand || posting.brand,
                                price: req.body.price || posting.price,
                                status: req.body.status || posting.status,
                                description: req.body.description || posting.description,
                                abstract: req.body.abstract || posting.abstract,
                                location: req.body.location || posting.location,
                                accepted: req.body.accepted || posting.accepted
                            })
                            .then(() => {
                                console.log("Successfully updated posting");
                                res.send(posting);
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

        return Posting
            .findById(id)
                .then(posting => {
                    if(!posting) {
                        return res.status(404).send({
                            message: `posting with id: ${id} not found.`
                        })
                    } else {
                        return posting
                            .destroy()
                            .then(() => {
                                let msg = `posting with id: ${id} destroyed.`
                                console.log(msg);
                                res.send(posting);

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

        return Posting
            .findById(id)
                .then(posting => {
                    if(!posting) {
                        return res.status(404).send({
                            message: `posting with id: ${id} not found.`
                        })
                    } else {
                        return res.send(posting)
                    }
                })
                .catch(error => {
                    console.log("Opps, we have encountered an error");
                    console.log(error);
                    res.status(400).send(error)
                });
    },

    findByUser(req, res) {
        let userId = parseInt(req.params.userId);
        return Posting
            .findAll({
                where: {
                    userId: userId
                },
                include: [{
                    model: User,
                    required: true,
                    as: "User"
                }]
            })
                .then((postings) => {
                    console.log(`Here are all of the postings that are associated to user ${userId}:`);
                    console.log(postings);
                    return res.send(postings);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },

    findByTitle(req, res) {
      let value = req.params.value;
      // console.log(value);
        return Posting
            .findAll({
                where: {
                  postingTitle: {
                    [Op.iLike]: `%${value}%`
                    // [Op.iLike]: "%awes%"
                  }
                },
                include: [{
                    model: User,
                    required: true,
                    as: "User"
                }]
            })
                .then((postings) => {
                    console.log("Here are the searched items:");
                    console.log(postings);
                    return res.send(postings);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },

    getActivePostsWithSellers(req, res) {
        return Posting
            .findAll({
                where: {
                    status: 'active'
                },
                include: [{
                    model: User,
                    required: true,
                    as: "User"
                }]
            })
                .then((postings) => {
                    console.log("Here are all active postings with users:");
                    console.log(postings);
                    return res.send(postings);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },

    recentPosts(req, res) {
        return Posting
            .findAll({
              //change to 100
                limit: 100,
                order: [['updatedAt', 'DESC']],
                where: {
                    status: 'active'
                },
                include: [{
                    model: User,
                    required: true,
                    as: "User"
                }]
            })
                .then((postings) => {
                    console.log("Here are 100 postings sorted by date:");
                    console.log(postings);
                    return res.send(postings);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },



    // set the post to pending, add the transaction to both user's collections
    // the buyerId to the buyer, and the status to pending
    // create the smart contract

    // our contract address: (address2) 0x96b78740DC0c15B79E3bb0037A2c90576148ECAC


    setUpTransaction(req, res) {

        console.log("req.params.id", req.params.id);

        console.log("req.body.validatedUser", req.body.validatedUser);

        let id = parseInt(req.params.id);

        if(req.body.id) {
            id = parseInt(req.body.id);
        }

        let txids = req.body.txids || [];

        let buyerId = req.body.validatedUser.id;

        let addy = req.body.contractAddress;

        if(!buyerId || !id || !addy) {
            return res.status(400).send({
                message: "Missing parameters, please check your request and try again."
            })
        }

        let contractAddress = addy.toLowerCase();

        return Posting
        .findById(id)
            .then(async posting => {
                if(!posting) {
                    return res.status(404).send({
                        message: `posting with id: ${id} not found.`
                    })
                } else {

                    if(posting.userId == buyerId) {
                        return res.status(400).send({
                            message: "Seller can not buy their own item."
                        })
                    }

                    let transaction = {
                        contractAddress: contractAddress,
                        txids: txids,
                        startedAt: Date.now(),
                        completedAt: null
                    }

                    await User.findById(buyerId)
                        .then(user => {
                            buyer = user;
                            console.log("Founder user", user);
                        })

                    return User.findById(buyerId)
                        .then(user => {
                            if(!user) {
                                return res.status(404).send({
                                    message: `user with id: ${buyerId} not found.`
                                })
                            } else {
                                return posting
                                    .update({
                                        status: "pendingConfirmation",
                                        buyerId: buyerId,
                                        transaction: transaction
                                    })
                                    .then(() => {
                                        console.log("Successfully updated posting");
                                        res.send(posting);
                                    })
                                    .catch((error) => {
                                        console.log("Opps we ran into an error");
                                        console.log(error);
                                        res.status(400).send(error);
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
    },

    setPostingStatus(req, res) {
        console.log("req.params.id", req.params.id);

        console.log("req.body.validatedUser", req.body.validatedUser);

        let id = parseInt(req.params.id);

        if(req.body.id) {
            id = parseInt(req.body.id);
        }

        let userId = req.body.validatedUser.id;

        let status = req.body.status;

        if(status != "active" &&
        status != "pendingConfirmation" &&
        status != "pending" &&
        status != "fulfilled" &&
        status != "cancelled") {
            return res.status(400).send({
                message: "status value is invalid"
            })
        }

        if(!userId || !id || !status) {
            return res.status(400).send({
                message: "Missing parameters, please check your request and try again."
            })
        }

        return Posting
        .findById(id)
            .then(posting => {
                if(!posting) {
                    return res.status(404).send({
                        message: `posting with id: ${id} not found.`
                    })
                } else {
                    if(posting.buyerId != userId && posting.userId != userId ) {
                        return res.status(403).send({
                            message: "Not authorized to execute this action"
                        })
                    }
                    return posting
                        .update({
                            status: status,
                        })
                        .then(() => {
                            console.log("Successfully updated posting");
                            res.send(posting);
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

    findBuyerPosts(req, res) {
        let userId = parseInt(req.params.userId);
        let ogPostings;
        return Posting
            .findAll({
                where: {
                    buyerId: userId
                },
                include: [{
                    model: User,
                    required: true,
                    as: 'User'
                }]
            })
                .then((postings) => {
                    console.log(`Here are all of the postings that are associated to user ${userId}:`);
                    console.log(postings);
                    return res.send(postings);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },

    setOffer(req, res) {

        let id = parseInt(req.body.id);
        console.log(req.body);
        let txid = req.body.txid;
        let accepted = Boolean(req.body.accepted);
        let status = "pending"
        if(!accepted) {
            status = "active"
        }

        return Posting
            .findById(id)
                .then(posting => {
                    if(!posting) {
                        return res.status(404).send({
                            message: `posting with id: ${id} not found.`
                        })
                    } else {

                        let newTransaction = posting.transaction;
                        if(txid) {
                            newTransaction.txids.push(txid);
                        }
                        return posting
                            .update({
                                accepted: accepted,
                                status: status,
                                transaction: newTransaction
                            })
                            .then(() => {
                                console.log("Successfully updated posting");
                                res.send(posting);
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

    findByUserWithBuyerDetails(req, res) {
        let userId = parseInt(req.params.userId);
        return Posting
            .findAll({
                where: {
                    userId: userId
                },
                include: [{
                    model: User,
                    required: true,
                    as: 'Buyer'
                }]
            })
                .then((postings) => {
                    console.log(`Here are all of the postings that are associated to user ${userId}:`);
                    console.log(postings);
                    return res.send(postings);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },

    // set the user as confirmed or rejected
    setTransaction(req, res) {
        let id = parseInt(req.body.id);
        let confirmed = Boolean(req.body.confirmed);
        let txid = req.body.txid;

        return Posting
            .findById(id)
                .then(posting => {
                    if(!posting) {
                        return res.status(404).send({
                            message: `posting with id: ${id} not found.`
                        })
                    } else {
                        let newTransaction = posting.transaction;
                        let newStatus = posting.status;
                        let ok = confirmed;

                        if(txid) {
                            newTransaction.txids.push(txid);
                        }

                        if(req.body.validatedUser.id == posting.userId) {
                            newTransaction.sellerOk = ok;
                        } else if(req.body.validatedUser.id == posting.buyerId) {
                            newTransaction.buyerOk = ok;
                        }

                        if(newTransaction.sellerOk && newTransaction.buyerOk) {
                            newStatus = "fulfilled";
                            newTransaction.completedAt = Date.now();
                        } else if(newTransaction.sellerOk == false && newTransaction.buyerOk == false) {
                            newStatus = "cancelled";
                            newTransaction.completedAt = Date.now();
                        } else if(newTransaction.sellerOk == false && newTransaction.buyerOk == true ||
                            newTransaction.sellerOk == true && newTransaction.buyerOk == false
                        ) {
                            newStatus = "disputing";
                        }

                        return posting
                            .update({
                                status: newStatus || posting.status,
                                transaction: newTransaction
                            })
                            .then(() => {
                                console.log("Successfully updated posting");
                                res.send(posting);
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

    }

}
