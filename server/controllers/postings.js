const Posting = require('../models/').Posting;
const User = require('../models/').User;
const verifyToken = require('./auth').verifyToken;

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
                                location: req.body.location || posting.location 
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
                }
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

    getActivePostsWithSellers(req, res) {
        return Posting
            .findAll({
                where: {
                    status: 'active'
                },
                include: [{
                    model: User,
                    required: true,
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

    // set the post to pending, add the transaction to both user's collections
    // the buyerId to the buyer, and the status to pending
    // create the smart contract

    // our contract address: (address2) 0x96b78740DC0c15B79E3bb0037A2c90576148ECAC


    setUpTransaction(req, res) {
        // BasicEscrow.new().then(function(instance) {
        //     // Print the new address
        //     console.log(instance.address);
        //   }).catch(function(err) {
        //     // There was an error! Handle it.
        //   });

        console.log("req.params.id", req.params.id);

        console.log("req.body.validatedUser", req.body.validatedUser);

        let id = parseInt(req.params.id);

        if(req.body.id) {
            id = parseInt(req.body.id);
        }

        let buyerId = req.body.validatedUser.id;

        if(!buyerId || !id) {
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

                    if(posting.userId == buyerId) {
                        return res.status(400).send({
                            message: "Seller can not buy their own item."
                        })
                    }

                    return posting
                        .update({
                            status: "pending",
                            buyerId: buyerId,
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

    setPostingAsSold(req, res) {
        // BasicEscrow.new().then(function(instance) {
        //     // Print the new address
        //     console.log(instance.address);
        //   }).catch(function(err) {
        //     // There was an error! Handle it.
        //   });

        console.log("req.params.id", req.params.id);

        console.log("req.body.validatedUser", req.body.validatedUser);

        let id = parseInt(req.params.id);

        if(req.body.id) {
            id = parseInt(req.body.id);
        }

        let userId = req.body.validatedUser.id;

        let status = req.body.status;

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

}
