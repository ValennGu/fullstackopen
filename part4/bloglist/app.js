const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()

logger.info('Connecting to database ...')
mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)
  .then(() => logger.info('Connected to database'))
  .catch(() => logger.error('Could not connect to database'))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app