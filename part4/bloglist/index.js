const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { mongoDBUri, port } = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(mongoDBUri)
  .then(() => logger.info('Connected to database'))
  .catch(() => logger.error('Could not connect to database'))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.get('/health', (req, res) => {
  res.send('App is healthy')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})