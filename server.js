const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/speakers', function(req, res) {
	res.send(`
		<h1>Hello world</h1>
		<h1>This will be our speakers page</h1>
	`);
});


app.listen(port, () => console.log(`Listening on port ${port}`));
