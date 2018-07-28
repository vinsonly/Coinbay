const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.locals.appName = 'Our Application';

// app.set('view engine', 'ejs');
// app.set('views', '../client/views');
// app.use(express.static('../client/public'));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

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

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// set up the set the routes defined in /server/routers to be endpoint
require('./routes')(app);

// default file to send if none of our other router handlers catch the request
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
})

app.listen(port, () => console.log(`Listening on port ${port}`));

// var pg = require('pg');
// var connectionString = process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/admin';

// const client = new pg.Client(connectionString);
// client.connect();


// client.query('SELECT * FROM playground;', (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows[0])
//   }
// })
