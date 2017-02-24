const
  router = require('express').Router();

router.get('/data', (req, res) => {
  res.json({data: 111});
});

module.exports = router;
