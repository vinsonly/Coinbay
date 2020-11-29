const usersController = require('../controllers').users;
const postingsController = require('../controllers').postings;
const adminusersController = require('../controllers').adminusers;
const authController = require('../controllers').auth;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Contacts API!'
      }));

    app.post('/api/user', usersController.isExistingUser, usersController.create); // anyone
    app.get('/api/users', [authController.verifyToken, authController.onlyAdminMiddleware], usersController.read); // only admin
    app.post('/api/user/update', [authController.verifyToken, usersController.isValidUpdate], usersController.update); // only user or admin
    app.post('/api/user/delete', authController.verifyToken, usersController.delete); // only user or admin
    app.get('/api/user/:id', usersController.findById); // anyone
    // app.get('/api/user/:id/boughtPosts', usersController.findBoughtPostsByUserId);
    app.get('/api/user/postings/:userId/transactionHistory', authController.verifyToken, usersController.transactionHistory); // only user or admin

    app.get('/api/user/postings/:userId', postingsController.findByUser); // anyone

    app.get('/api/postings', postingsController.read); // anyone
    app.post('/api/posting/setSold', authController.verifyToken, postingsController.setSold); // only posting owner
    app.post('/api/posting/setoffer', authController.verifyToken, postingsController.setOffer); // only posting owner
    app.post('/api/posting', authController.verifyToken, postingsController.create); // user must be logged in
    app.post('/api/posting/update', authController.verifyToken, postingsController.update); // only posting owner
    app.post('/api/posting/delete', authController.verifyToken, postingsController.delete);// posting owner or admin
    app.get('/api/posting/:id', postingsController.findById); // anyone
    app.get('/api/postings_with_users/', postingsController.getActivePostsWithSellers); // anyone
    app.get('/api/buyer_postings/:userId', postingsController.findBuyerPosts); // anyone
    app.get('/api/seller_postings/:userId/with_buyer', postingsController.findByUserWithBuyerDetails); // anyone
    app.get('/api/postings/searchTitle/:value', postingsController.findByTitle); // anyone
    app.get('/api/postings/searchUsername/:value', postingsController.findByUsername); // anyone
    app.get('/api/postings/newest/', postingsController.recentPosts); // anyone

    app.post('/api/posting/buy/:id', authController.verifyToken, postingsController.setUpTransaction); // user must be logged in
    app.post('/api/posting/set_transaction', authController.verifyToken, postingsController.setTransaction)

    // WRITE THE OTHER ENDPOINTS DOWN HERE
    app.post('/api/login', authController.login);
    app.post('/api/validateToken', authController.checkToken);
}
