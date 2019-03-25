import axios from 'axios'
import cheerio from 'cheerio'
import he from 'he'

export async function scrapeMovies(term) {
  const title = term.replace(' ', '+')
  const url = `https://www.imdb.com/search/title?title=${title}&title_type=feature&has=alternate-versions`
  const html = await getHTML(url)
  return await getMoviesDetails(html)
}

async function getHTML(url) {
  const { data: html } = await axios.get(url, {
    headers: {
      'Accept-Language': 'en-us'
    }
  })
  return html
}

async function getMoviesDetails(html) {
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

    const info = $(this)
      .find('.lister-item-content .lister-item-header')
      .next()
      .text()
      .trim()
    const [_, duration, genre] = info.split('|')

    const synopsis = $(this)
      .find('.lister-item-content .ratings-bar')
      .next()
      .text()
      .trim()

    movies.push({
      duration: duration.trim(),
      genre: genre.split(',').map(item => item.trim()),
      synopsis: he.decode(synopsis),
      title: he.decode(title),
      url: `https://imdb.com${url}`,
      year
    })
  })

  return await getMoviesPoster(movies)
}

async function getMoviesPoster(movies) {
  const moviesWithPoster = []

  for await (const movie of movies) {
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
