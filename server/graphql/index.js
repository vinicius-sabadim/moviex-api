const express_graphql = require('express-graphql')
const schema = require('./movie/movieSchema')
const root = require('./movie/movieController')
const config = require('../config')

module.exports = express_graphql({
  schema, rootValue: root, graphiql: config.graphiql
})