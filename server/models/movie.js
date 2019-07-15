import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  identifier: {
    type: String,
    unique: true
  },
  genre: {
    type: [String]
  },
  duration: {
    type: String
  },
  poster: {
    type: String,
    required: true
  },
  synopsis: {
    type: String
  },
  year: {
    type: String,
    required: true
  }
})

export default mongoose.model('movie', MovieSchema)
