const router = require('express').Router()

router.use('/movies', require('./movie/movieRoutes'))

module.exports = router