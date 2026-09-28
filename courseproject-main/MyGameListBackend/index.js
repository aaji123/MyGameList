require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())
const Game = require('./mongo')

app.get('/api/games', (req, res) => {
  Game.find({}).then(games => {
    res.json(games)
  })
})

app.get('/api/games/:id', (req, res) => {
  Game.findById(req.params.id).then(game => {
    if (game) {
      res.json(game)
    } else {
      res.status(404).end()
    }
  })
})

app.post('/api/games', (req, res) => {
  const title = req.body.title
  const genre = req.body.genre
  const rating = req.body.rating
  const review = req.body.review
  const status = req.body.status

  if (!title) {
    return res.status(400).json({ error: 'title is missing' })
  }
  if (!genre) {
    return res.status(400).json({ error: 'genre is missing' })
  }
  if (!rating) {
    return res.status(400).json({ error: 'rating is missing' })
  }
  if (!review) {
    return res.status(400).json({ error: 'review is missing' })
  }
  if (!status) {
    return res.status(400).json({ error: 'status is missing' })
  }

  const game = new Game({ title, genre, rating, review, status })
  game.save().then(savedGame => {
    res.json(savedGame)
  })
})

app.delete('/api/games/:id', (req, res) => {
  Game.findByIdAndDelete(req.params.id).then(result => {
    res.status(204).end()
  })
})

app.patch('/api/games/:id/status', (req, res) => {
  const status = req.body.status

  Game.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).then(updatedGame => {
    res.json(updatedGame)
  })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)