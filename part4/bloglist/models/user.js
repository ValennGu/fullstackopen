const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User name is required.']
  },
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required.']
  }
}).set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

module.exports = mongoose.model('User', userSchema)