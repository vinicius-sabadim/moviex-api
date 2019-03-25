import Movie from '../../models/movie'

const getMovie = args => {
  const { id } = args
  return Movie.findById(id).then(movie => movie)
}

const getMovies = args => {
  let filter = {}
  if (args.genre) filter = Object.assign(filter, { genre: args.genre })

  return Movie.find(filter).then(movies => movies)
}

export default {
  movie: getMovie,
  movies: getMovies
}
