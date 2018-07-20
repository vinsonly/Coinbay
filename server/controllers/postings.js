const Posting = require('../models/').Posting;

module.exports = {
    // define your route handlers here, see below for details

    create(req, res) {

        return Posting
            .create({
                postingTitle: req.body.postingTitle,
                modelName: req.body.modelName,
                brand: req.body.brand,
                price: req.body.price,
                status: req.body.status,
                description: req.body.description
            })
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
                .then((posting) => {
                    console.log("Here are all of the postings:");
                    console.log(posting);
                    return res.send(posting);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },

}


/*
module.exports = {

    // route handler to create a new user
    create(req, res) {

        console.log("req.body:");

        console.log(req.body);

        return user
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress,
                phoneNumber: req.body.phoneNumber,
                notes: req.body.notes
            })
            .then((user) => {
                console.log("Created a new user");
                console.log(user);
                res.status(201).send(user);
            })
            .catch((error) => {
                console.log("Failed to create a new user");
                console.log(error);
                res.status(400).send(error)
            })
    },

    read(req, res) {
        return user
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

        return user
            .findById(id)
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: `user with id: ${id} not found.`
                        })
                    } else {
                        return user
                            .update({
                                firstName: req.body.firstName || user.firstName,
                                lastName: req.body.lastName || user.lastName,
                                emailAddress: req.body.emailAddress || user.emailAddress,
                                phoneNumber: req.body.phoneNumber || user.phoneNumber,
                                notes: req.body.notes || user.notes
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

        return user
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

        return user
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

}
*/
