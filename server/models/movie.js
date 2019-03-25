import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  genre: {
    type: [String]
  },
  duration: {
    type: String
  },
  poster: {
    type: String
  },
  synopsis: {
    type: String
  },
  year: {
    type: String
  }
})

export default mongoose.model('movie', MovieSchema)
