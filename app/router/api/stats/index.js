const
  router = require('express').Router(),
  Stat = require('mongoose').model('Stat');

router.get('/', list);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

/**
 * REST API
 */
function list(req, res) {
  return Stat.find({})
    .populate('sprint')
    .exec()
    .then(stats => res.status(200).json(stats))
    .catch(handleError(res));
}

function show(req, res) {
  return Stat.findById(req.params.id)
    .populate('sprint')
    .exec()
    .then(stat => {
      if (!stat) {
        res.status(404).end();
      }

      return res.status(200).json(stat);
    })
    .catch(handleError(res));
}

function create(req, res) {
  let stat = new Stat(req.body);

  return stat.save()
    .then(stat => 
      Stat.findOne(stat)
        .populate('sprint')
        .exec()
        .then(stat => res.status(201).json(stat))
        .catch(handleError(res))
    )
    .catch(validateError(res));
}

function update(req, res) {
  return Stat.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(stat => {
      Stat.findOne(stat)
        .populate('sprint')
        .exec()
        .then(statItem => res.status(200).json(statItem))
        .catch(handleError(res));
    })
    .catch(handleError(res));
}

function destroy(req, res) {
  return Stat.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).end())
    .catch(handleError(res));
}

/**
 * Helpers
 */
function validateError(res, statusCode = 422) {
	return err => res.status(statusCode).send(err);
}

function handleError(res, statusCode = 500) {
  return err => res.status(statusCode).send(err);
}

module.exports = router;
