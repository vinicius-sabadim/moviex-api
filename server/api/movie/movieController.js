const _ = require('lodash')

const Movie = require('../../models/movie')

exports.param = (req, res, next, id) => {
  Movie.findById(id)
    .then((movie) => {
      if (!movie) return next('No movie found with this id')
      
      req.movie = movie
      next()
    })
}

exports.get = (req, res) => {
  Movie.find({})
    .then((movies) => res.json(movies))
}

exports.post = (req, res, next) => {
  const newMovie = new Movie(req.body)

  newMovie.save((err, movie) => {
    if(err) return next(err)
    res.json(movie)
  })
}

exports.getOne = (req, res) => res.json(req.movie)

exports.put = (req, res) => {
  const updatedMovie = _.merge(req.movie, req.body)

  updatedMovie.save((err, saved) => {
    if (err) return next(err)
    res.json(saved)
  })
}

exports.delete = (req, res) => {
  req.movie.remove((err, removed) => {
    if (err) return next(err)
    res.json(removed)
  })
}