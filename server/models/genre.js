import mongoose from 'mongoose'

const Schema = mongoose.Schema

const GenreSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
})

export default mongoose.model('genre', GenreSchema)
