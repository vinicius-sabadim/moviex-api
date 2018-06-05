const router = require('express').Router()

const controller = require('./movieController')

router.route('/')
  .get(controller.get)

module.exports = router