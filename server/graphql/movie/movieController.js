const Movie = require('../../models/movie')

const getMovie = (args) => {
  const { id } = args
  return Movie.findById(id).then((movie) => movie)
}

const getMovies = (args) => {
  let filter = {}
  if (args.genre) filter = Object.assign(filter, { genre: args.genre })

  return Movie.find(filter).then((movies) => movies)
}

module.exports = {
  movie: getMovie,
  movies: getMovies
}