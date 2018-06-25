const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  genre: {
    type: String
  }
})

module.exports = mongoose.model('movie', MovieSchema)