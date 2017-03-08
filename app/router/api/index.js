const
  router = require('express').Router();

router.use('/stats', require('./stats'));
router.use('/sprints', require('./sprints'));

module.exports = router;
