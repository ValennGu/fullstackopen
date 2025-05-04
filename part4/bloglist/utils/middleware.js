const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.path} ${JSON.stringify(req.body)}`)
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  if (error.name === 'MongoServerError' || error.name === 'MongooseError') {
    return res.status(500).json({ error: error.message })
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted id' })
  }

  if (error.name === 'Unauthorized') {
    return res.status(401).json({ error: error.message })
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}