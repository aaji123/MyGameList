const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI

mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const gameSchema = new mongoose.Schema({
  title:  String,
  genre:  String,
  rating: Number,
  review: String,
  status: String,
})

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Game', gameSchema)