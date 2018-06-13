let id = 4

const movies = [{
  id: 1,
  title: 'Lord of the rings',
  genre: 'Fantasy'
}, {
  id: 2,
  title: 'Labyrinth',
  genre: 'Fantasy'
}, {
  id: 3,
  title: 'Hellraiser',
  genre: 'Horror'
}, {
  id: 4,
  title: 'The Texas chainsaw massacre',
  genre: 'Horror'
}]

const addMovie = (movie) => {
  id = id + 1
  movie = { id, ...movie }
  movies.push(movie)
  return movie
}

module.exports = { movies, addMovie }