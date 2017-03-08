const
  router = require('express').Router(),
  Sprint = require('mongoose').model('Sprint');

router.get('/', list);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

/**
 * REST API
 */
function list(req, res) {
  return Sprint.find({})
    .populate('stats')
    .exec()
    .then(sprints => res.status(200).json(sprints))
    .catch(handleError(res));
}

function show(req, res) {
  return Sprint.findById(req.params.id)
    .populate('stats')
    .exec()
    .then(sprint => {
      if (!sprint) {
        res.status(404).end();
      }

      return res.status(200).json(sprint);
    })
    .catch(handleError(res));
}

function create(req, res) {
  let sprint = new Sprint(req.body);

  return sprint.save()
    .then(sprint => res.status(201).json(sprint))
    .catch(validateError(res));
}

function update(req, res) {
  return Sprint.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(sprint => {
      Sprint.findOne(sprint)
        .populate('stats')
        .exec()
        .then(sprintItem => res.status(200).json(sprintItem))
        .catch(handleError(res));
    })
    .catch(handleError(res));
}

function destroy(req, res) {
  return Sprint.findByIdAndRemove(req.params.id)
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
