import mongoose from 'mongoose'
import fs from 'fs'

import { scrapeTopMoviesByGenre, saveOnDatabase } from './'
import logger from '../utils/logger'
import config from '../config'

mongoose.connect(config.db.url)
mongoose.set('useCreateIndex', true)

async function getFromImdb(genre) {
  logger.log(`Starting to scrape top movies for the genre - ${genre}`)
  const movies = await scrapeTopMoviesByGenre(genre)
  logger.log(`Finished to scrape top movies for the genre - ${genre}`)
  writeOnFile(genre, movies)
  await saveOnDatabase(movies)
  process.exit()
}

const writeOnFile = (genre, movies) => {
  const text = JSON.stringify(movies)
  fs.writeFileSync(`${genre}.txt`, text)
}

const readFromFile = async genre => {
  const file = fs.readFileSync(`${genre}.txt`)
  const movies = JSON.parse(file)
  await saveOnDatabase(movies)
  process.exit()
}

const arg = process.argv[2]
arg === 'file' ? readFromFile(process.argv[3]) : getFromImdb(arg)
