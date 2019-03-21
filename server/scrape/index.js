import axios from 'axios'
import cheerio from 'cheerio'
import he from 'he'

export async function scrapeMovie(term) {
  const title = term.replace(' ', '+')
  const url = `https://www.imdb.com/search/title?title=${title}&title_type=feature&has=alternate-versions`
  const html = await getHTML(url)
  const movies = await getMovieDetails(html)
  return movies
}

async function getHTML(url) {
  const { data: html } = await axios.get(url, {
    headers: {
      'Accept-Language': 'en-us'
    }
  })
  return html
}

async function getMovieDetails(html) {
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

    const synopsis = $(this)
      .find('.lister-item-content .ratings-bar')
      .next()
      .text()
      .trim()

    movies.push({
      synopsis: he.decode(synopsis),
      title: he.decode(title),
      url,
      year
    })
  })

  const newMovies = await printFiles(movies)
  console.log(newMovies)
  return movies
}

async function printFiles(movies) {
  return await movies.reduce(async (promise, movie) => {
    await promise
    const html = await getHTML(`https://www.imdb.com${movie.url}`)
    const image = await getPoster(html)
    return (movie = {
      ...movie,
      image
    })
  }, Promise.resolve())
}

async function getPoster(html) {
  const $ = cheerio.load(html)
  const image = await $('.poster a img').attr('src')
  return image
}
