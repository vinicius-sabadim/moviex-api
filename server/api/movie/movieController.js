const _ = require('lodash')

const logger = require('../../utils/logger')
let movies = require('./movieModel')
let id = 1

exports.param = (req, res, next, id) => {
  const movie = movies.find((movie) => movie.id === parseInt(id, 10))
  if (!movie) {
    next(new Error('No movie with that id'))
  } else {
    req.movie = movie
    next()
  }
}

exports.get = (req, res) => {
  res.json(movies)
}

exports.post = (req, res) => {
  const movie = { ...req.body, id }
  movies.push(movie)
  id = id + 1

  res.json(movie)
}

exports.getOne = (req, res) => {
  res.json(req.movie)
}

exports.put = (req, res) => {
  const updatedMovie = _.merge(req.movie, req.body)
  movies = movies.map((movie) => {
    if (movie.id === updatedMovie.id) return updatedMovie
    return movie
  })
  
  res.json(updatedMovie)
}

exports.delete = (req, res) => {
  const { movie } = req
  const deletedMovie = movies.find((item) => item.id === movie.id)
  movies = movies.filter((item) => item.id !== movie.id)

  res.json(deletedMovie)
}