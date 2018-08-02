const Posting = require('../models/').Posting;
const User = require('../models/').User;
const verifyToken = require('./auth').verifyToken;

// verification example
// app.post('/api/blah', verifyToken, (req, res) => {
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if(err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "BLAH",
//         authData
//       });
//     }
//   });  
// });

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

}

/*
update(req, res) {
        
    let id = parseInt(req.body.id);
    console.log(req.body);
    
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
}

*/
