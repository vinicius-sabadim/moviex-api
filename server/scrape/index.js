import logger from '../utils/logger'
import Movie from '../models/movie'

import { getHTML, getMoviesDetails } from './utils'

export async function scrapeTopMoviesByGenre(genre) {
  const url = `https://www.imdb.com/search/title?genres=${genre}&sort=user_rating,desc&title_type=feature&num_votes=25000,`
  const html = await getHTML(url)
  return await getMoviesDetails(html)
}

export async function scrapeMoviesByTitle(term) {
  const title = term.replace(' ', '+')
  const url = `https://www.imdb.com/search/title?title=${title}&title_type=feature&has=alternate-versions`
  const html = await getHTML(url)
  return await getMoviesDetails(html)
}

export async function saveOnDatabase(movies) {
  return await movies
    .filter(movie => movie.poster)
    .forEach(async movie => {
      try {
        await Movie.create(movie)
      } catch (err) {
        logger.error(err.message)
      }
    })
}
