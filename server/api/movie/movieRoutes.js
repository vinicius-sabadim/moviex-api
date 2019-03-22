const router = require('express').Router()

const controller = require('./movieController')

router.param('id', controller.param)

router
  .route('/')
  .get(controller.get)
  .post(controller.post)

router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.deleteMovie)

module.exports = router
