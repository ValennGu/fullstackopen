require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (_request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  console.log(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.get('/health', (req, res) => {
  res.send('App is healthy')
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})