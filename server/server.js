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
