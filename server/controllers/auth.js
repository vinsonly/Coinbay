const User = require('../models/').User;
const Posting = require('../models/').Posting;

const bcrypt = require('bcrypt');

console.log(User);


// app.post('/api/login', (req, res) => {
//     // Mock user
//     // get the user to send in the username and password here
//     // then authenticate user's password with bcrypt
  
//     const user = {
//       id: 1,
//       username: 'vinson',
//       email: 'vinsonly@live.ca'
//     }
  
//     jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
//       res.json({
//         token
//       });
//     });
//   });

module.exports = {
    // define your route handlers here, see below for details

    login(req, res) {
        console.log("req.body:");
        console.log(req.body);
        console.log("logging out");

        // verify the user's login information


        jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
            res.json({
                token
            });
        });

    },

    signout(req, res) {
        console.log("signing out");
    },

    // Verify Token
    verifyToken(req, res, next) {
        // Get auth header value (token)
        // console.log(req);
    
        const bearerHeader = req.headers['authorization'];
    
        console.log(bearerHeader);
    
        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
        next();
        } else {
        // Forbidden
        res.status(403).send("Authorization token invalid, you are not authorized to access this endpoint.");
        }
    }

}