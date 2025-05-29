const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.path} ${JSON.stringify(req.body)}`)
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error)

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

  if (error.name === 'SyntaxError') {
    return res.status(400).json({ error: 'SyntaxError' })
  }

  if (error.name === 'NotFound') {
    return res.status(404).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization && authorization.startsWith('Bearer')) {
    const token = authorization.replace('Bearer ', '')
    req.token = token
  }

  next()
}

const userExtractor = async (req, res, next) => {
  // Falta error handling.

  const decodedToken = jwt.verify(req.token, SECRET)
  if (!decodedToken) {
    return next({ name: 'JsonWebTokenError' })
  }

  const user = await User.findOne({ username: decodedToken.username })
  if (!user) {
    return next({ name: 'Unauthorized', message: 'User not valid.' })
  }

  req.user = user

  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}