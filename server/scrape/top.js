import mongoose from 'mongoose'

import { scrapeTopMoviesByGenre } from './'
import Movie from '../models/movie'
import logger from '../utils/logger'
import config from '../config'

mongoose.connect(config.db.url)
mongoose.set('useCreateIndex', true)

async function go(genre) {
  logger.log(`Starting to scrape top movies for the genre - ${genre}`)
  const movies = await scrapeTopMoviesByGenre(genre)
  logger.log(`Finished to scrape top movies for the genre - ${genre}`)
  await Movie.insertMany(movies.filter(movie => movie.poster))
  process.exit()
}

const genre = process.argv[2]
go(genre)
