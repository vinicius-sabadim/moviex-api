import logger from '../utils/logger'
import Genre from '../models/genre'
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
  const genres = await Genre.find()

  const moviesWithPoster = movies
    .filter(movie => movie.poster)
    .map(movie => ({
      ...movie,
      genre: movie.genre.map(genre => getGenreObject(genres, genre))
    }))

  for (const movie of moviesWithPoster) {
    try {
      await Movie.create(movie)
      logger.log(`Saved the movie - ${movie.title}`)
    } catch (err) {
      logger.error(err.message)
    }
  }
}

const getGenreObject = (genres, name) => {
  return genres.find(genre => genre.name === name)
}
