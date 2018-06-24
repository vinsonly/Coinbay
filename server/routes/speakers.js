var express = require('express');
var router = express.Router();

router.get('/speakers', (req, res) => {
	res.render('speakers');
});

module.exports = router;
