import mongoose from 'mongoose'

import config from './config'
import Genre from './models/genre'
import logger from './utils/logger'

mongoose.connect(config.db.url)
mongoose.set('useCreateIndex', true)

const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western'
].map(genre => ({
  name: genre
}))

const run = async () => {
  for (const genre of genres) {
    try {
      await Genre.create(genre)
      logger.log(`Saved the genre - ${genre.name}`)
    } catch (err) {
      logger.error(err.message)
    }
  }
  process.exit()
}

run()
