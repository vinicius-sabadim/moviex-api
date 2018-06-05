const movies = require('./movieModel')

exports.get = (req, res) => {
  res.json(movies)
}