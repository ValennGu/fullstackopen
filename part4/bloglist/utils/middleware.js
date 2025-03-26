const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.path} ${JSON.stringify(req.body)}`)
  next()
}

module.exports = {
  requestLogger
}