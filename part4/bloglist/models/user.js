const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minLength: [3, 'Username should be at least 3 characters long.'],
    unique: [true, 'Username already exists']
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  passwordHash: {
    type: String,
    required: [true, 'PasswordHash is required']
  }
}).set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

module.exports = mongoose.model('User', userSchema)