const usersController = require('../controllers').users;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Contacts API!'  
      }));

    app.post('/api/user', usersController.create);

    app.get('/api/users', usersController.read);


  
    // WRITE THE OTHER ENDPOINTS DOWN HERE

    // EXAMPLES:
    //  //CREATE
    //  app.post('/api/contact', contactsController.create);

    //  //READ
    //  app.get('/api/contacts', contactsController.read);
 
}
