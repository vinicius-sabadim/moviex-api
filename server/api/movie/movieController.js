import _ from 'lodash'
import Movie from '../../models/movie'
import { scrapeMoviesByTitle } from '../../scrape'

export const param = (req, res, next, id) => {
  Movie.findById(id).then(movie => {
    if (!movie) return next('No movie found with this id')

    req.movie = movie
    next()
  })
}

export const get = async (req, res) => {
  const { query } = req

  if (!query.search) {
    return res.json(
      await Movie.find({
        year: { $ne: '' }
      }).sort('title')
    )
  }

  const search = query.search.replace('+', '')
  const movies = await Movie.find({
    title: { $regex: search, $options: 'i' },
    year: { $ne: null }
  }).sort('title')

  if (!movies.length) {
    const imdbMovies = await scrapeMoviesByTitle(query.search)
    Movie.insertMany(imdbMovies.filter(movie => movie.poster))
    res.json(imdbMovies)
  } else {
    res.json(movies)
  }
}

export const post = (req, res, next) => {
  const newMovie = new Movie(req.body)

  newMovie.save((err, movie) => {
    if (err) return next(err)
    res.json(movie)
  })
}

export const getOne = (req, res) => res.json(req.movie)

export const put = (req, res) => {
  const updatedMovie = _.merge(req.movie, req.body)

  updatedMovie.save((err, saved) => {
    if (err) return next(err)
    res.json(saved)
  })
}

export const deleteMovie = (req, res) => {
  req.movie.remove((err, removed) => {
    if (err) return next(err)
    res.json(removed)
  })
}
