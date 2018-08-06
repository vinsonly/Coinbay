const usersController = require('../controllers').users;
const postingsController = require('../controllers').postings;
const adminusersController = require('../controllers').adminusers;
const authController = require('../controllers').auth;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Contacts API!'
      }));

    app.post('/api/user', usersController.isExistingUser, usersController.create);
    app.get('/api/users', usersController.read);
    app.post('/api/user/update', usersController.isValidUpdate, usersController.update);
    app.post('/api/user/delete', usersController.delete);
    app.get('/api/user/:id', usersController.findById);
    app.get('/api/user/:id/boughtPosts', usersController.findBoughtPostsByUserId);
    app.get('/api/user/postings/:userId/transactionHistory', usersController.transactionHistory);

    app.get('/api/user/postings/:userId', postingsController.findByUser);

    app.get('/api/postings', postingsController.read);
    app.post('/api/posting/setoffer', postingsController.setOffer);
    app.post('/api/posting', authController.verifyToken, postingsController.create);
    app.post('/api/posting/update', postingsController.update);
    app.post('/api/posting/delete', postingsController.delete);
    app.get('/api/posting/:id', postingsController.findById);
    app.get('/api/postings_with_users/', postingsController.getActivePostsWithSellers);
    app.get('/api/buyer_postings/:userId', postingsController.findBuyerPosts);
    app.get('/api/seller_postings/:userId/with_buyer', postingsController.findByUserWithBuyerDetails);
    app.get('/api/postings/searchTitle/:value', postingsController.findByTitle);
    app.get('/api/postings/searchUsername/:value', postingsController.findByUsername);
    app.get('/api/postings/newest/', postingsController.recentPosts);
    // app.get('/api/postings/?=asdsadsadsad', postingsController.search); //read the query string from the URL and query the database

    app.post('/api/posting/buy/:id', authController.verifyToken, postingsController.setUpTransaction);
    app.post('/api/posting/set_transaction', authController.verifyToken, postingsController.setTransaction)

    app.get('/api/adminusers', adminusersController.read);
    app.post('/api/adminuser', adminusersController.create);


    // WRITE THE OTHER ENDPOINTS DOWN HERE

    app.post('/api/login', authController.login);
    app.post('/api/validateToken', authController.checkToken);


    // EXAMPLES:
    //  //CREATE
    //  app.post('/api/contact', contactsController.create);

    //  //READ
    //  app.get('/api/contacts', contactsController.read);

}
