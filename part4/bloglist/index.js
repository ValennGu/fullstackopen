require('dotenv').config()

const Logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.get('/health', (req, res) => {
  res.send('App is healthy')
})

app.listen(process.env.PORT, () => {
  Logger.info(`Server running on port ${process.env.PORT}`)
})