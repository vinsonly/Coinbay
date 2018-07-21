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

    update(req, res) {
        
        let id = parseInt(req.body.id);
        console.log(req.body);
        
        return AdminUser
            .findById(id)
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: `admin user with id: ${id} not found.`
                        })
                    } else {
                        return user
                            .update({
                                email: req.body.email || user.email,
                                username: req.body.username || user.username,
                                password: req.body.password || user.password
                            })
                            .then(() => {
                                console.log("Successfully updated Admin user");
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
        
        return AdminUser 
            .findById(id)
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: `Admin user with id: ${id} not found.`
                        })
                    } else {
                        return user
                            .destroy()
                            .then(() => {
                                let msg = `Admin user with id: ${id} destroyed.`
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

*/
