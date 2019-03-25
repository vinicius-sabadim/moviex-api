import express_graphql from 'express-graphql'
import schema from './movie/movieSchema'
import root from './movie/movieController'
import config from '../config'

export default express_graphql({
  schema,
  rootValue: root,
  graphiql: config.graphiql
})
