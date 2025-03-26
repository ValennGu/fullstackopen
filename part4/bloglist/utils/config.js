require('dotenv').config()

module.exports = {
  mongoDBUri: process.env.MONGODB_URI,
  port: process.env.PORT
}