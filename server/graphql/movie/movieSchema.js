const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    movie(id: Int!): Movie
    movies(genre: String): [Movie]
  },
  type Movie {
    id: Int
    title: String
    genre: String
  }
`)

module.exports = schema