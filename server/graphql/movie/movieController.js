const { movies } = require('../../data/movies')

const getMovie = (args) => {
  const { id } = args
  const movie = movies.filter((movie) => movie.id === id)
  return movie.length > 0 ? movie[0] : []
}

const getMovies = (args) => {
  if (args.genre) {
    const { genre } = args
    return movies.filter((movie) => movie.genre === genre)
  }
  return movies
}

module.exports = {
  movie: getMovie,
  movies: getMovies
}