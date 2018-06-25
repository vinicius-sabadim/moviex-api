const bodyParser = require('body-parser')

const logger = require('../utils/logger')

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
}