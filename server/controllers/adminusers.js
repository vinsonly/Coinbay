const AdminUser = require('../models/').AdminUser;

module.exports = {
    // define your route handlers here, see below for details

    create(req, res) {

        return AdminUser
            .create({
              email: req.body.email,
              username: req.body.username,
              password: req.body.password
            })
            .then((admin) => {
                console.log("Created a new admin");
                console.log(admin);
                res.status(201).send(admin);
            })
            .catch((error) => {
                console.log("Failed to create a new admin user");
                console.log(error);
                res.status(400).send(error)
            })
    },

    read(req, res) {
        return AdminUser
            .findAll()
                .then((admin) => {
                    console.log("Here are all of the admins:");
                    console.log(admin);
                    return res.send(admin);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },

}
