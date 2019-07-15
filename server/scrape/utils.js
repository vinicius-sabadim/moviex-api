import axios from 'axios'
import cheerio from 'cheerio'
import he from 'he'

import logger from '../utils/logger'

export async function getHTML(url) {
  const { data: html } = await axios.get(url, {
    headers: {
      'Accept-Language': 'en-us'
    }
  })
  return html
}

export async function getMoviesDetails(html) {
  const movies = []
  const $ = cheerio.load(html)

  $('.lister-item').each(async function() {
    const url = $(this)
      .find('.lister-item-image a')
      .attr('href')

    const title = $(this)
      .find('.lister-item-content .lister-item-header a')
      .html()

    const year = $(this)
      .find('.lister-item-content .lister-item-header .lister-item-year')
      .html()
      .replace('(', '')
      .replace(')', '')
    if (!year) return

    const info = $(this)
      .find('.lister-item-content .lister-item-header')
      .next()
      .text()
      .trim()
    if (!info) return

    const [_, duration, genre] = info.split('|')
    if (!genre) return

    const synopsis = $(this)
      .find('.lister-item-content .ratings-bar')
      .next()
      .text()
      .trim()

    const decodedTitle = he.decode(title)
    const identifier = `${decodedTitle}-${duration.trim()}-${year}`.replace(
      /\s/g,
      '-'
    )

    movies.push({
      identifier,
      duration: duration.trim(),
      genre: genre.split(',').map(item => item.trim()),
      synopsis: he.decode(synopsis),
      title: decodedTitle,
      url: `https://imdb.com${url}`,
      year
    })
  })
  return await getMoviesPoster(movies)
}

async function getMoviesPoster(movies) {
  const moviesWithPoster = []

  for await (const movie of movies) {
    logger.log(`Looking information for the movie - ${movie.title}`)

    const html = await getHTML(movie.url)
    const poster = await getPoster(html)
    moviesWithPoster.push({
      ...movie,
      poster
    })
  }

  return moviesWithPoster.map(({ url, ...movie }) => ({ ...movie }))
}

async function getPoster(html) {
  const $ = cheerio.load(html)
  return await $('.poster a img').attr('src')
}
