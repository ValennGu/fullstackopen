require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()


mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info('Connected to database'))
  .catch(() => logger.error('Could not connect to database'))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.get('/health', (req, res) => {
  res.send('App is healthy')
})

app.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`)
})