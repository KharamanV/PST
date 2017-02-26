const
  router = require('express').Router(),
  Stat = require('mongoose').model('Stat');

router.get('/', (req, res) => {
	res.send('qwe');
});

router.post('/', (req, res) => {
	console.log(req.body);
	//let stat = new Stat();
});

module.exports = router;
