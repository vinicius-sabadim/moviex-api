import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Query {
    movie(id: String!): Movie
    movies(genre: String): [Movie]
  },
  type Movie {
    id: String
    title: String
    genre: String
  }
`)

export default schema
