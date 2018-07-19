const User = require('../models/').User;


module.exports = {
    // define your route handlers here, see below for details
}


/*
module.exports = {
    
    // route handler to create a new contact
    create(req, res) {

        console.log("req.body:");
        
        console.log(req.body);

        return Contact
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress,
                phoneNumber: req.body.phoneNumber,
                notes: req.body.notes
            })
            .then((contact) => {
                console.log("Created a new contact");
                console.log(contact);
                res.status(201).send(contact);
            })
            .catch((error) => {
                console.log("Failed to create a new contact");
                console.log(error);
                res.status(400).send(error)
            })
    },

    read(req, res) {
        return Contact
            .findAll()
                .then((contacts) => {
                    console.log("Here are all of the contacts:");
                    console.log(contacts);
                    return res.send(contacts);
                })
                .catch((err) => {
                    console.log("We ran into an error:");
                    console.log(err);
                    return res.status(400).send(err);
                })
    },

    update(req, res) {
        
        let id = parseInt(req.body.id);
        
        return Contact
            .findById(id)
                .then(contact => {
                    if(!contact) {
                        return res.status(404).send({
                            message: `Contact with id: ${id} not found.`
                        })
                    } else {
                        return contact
                            .update({
                                firstName: req.body.firstName || contact.firstName,
                                lastName: req.body.lastName || contact.lastName,
                                emailAddress: req.body.emailAddress || contact.emailAddress,
                                phoneNumber: req.body.phoneNumber || contact.phoneNumber,
                                notes: req.body.notes || contact.notes
                            })
                            .then(() => {
                                console.log("Successfully updated contact");
                                res.send(contact);
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
        
        return Contact 
            .findById(id)
                .then(contact => {
                    if(!contact) {
                        return res.status(404).send({
                            message: `Contact with id: ${id} not found.`
                        })
                    } else {
                        return contact
                            .destroy()
                            .then(() => {
                                let msg = `Contact with id: ${id} destroyed.`
                                console.log(msg);
                                res.send(contact);

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
        
        return Contact 
            .findById(id)
                .then(contact => {
                    if(!contact) {
                        return res.status(404).send({
                            message: `Contact with id: ${id} not found.`
                        })
                    } else {
                        return res.send(contact)
                    }
                })
                .catch(error => {
                    console.log("Opps, we have encountered an error");
                    console.log(error);
                    res.status(400).send(error)
                });
    },

    deleteAll(req, res) {
        return Contact
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