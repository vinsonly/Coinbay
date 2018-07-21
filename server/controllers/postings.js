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
