const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.locals.appName = 'Our Application';

app.use(require('./routes/index'));
app.use(require('./routes/speakers'));

app.set('view engine', 'ejs');
app.set('views', '../client/views');
app.use(express.static('../client/public'));

app.listen(port, () => console.log(`Listening on port ${port}`));

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/admin';

const client = new pg.Client(connectionString);
client.connect();


client.query('SELECT * FROM playground;', (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})
