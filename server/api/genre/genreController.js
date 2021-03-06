import _ from 'lodash'

import Genre from '../../models/genre'

export const get = async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.json(genres)
}
