const mongoose = require('mongoose')

// TODO: Add custom validators.
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  author: String,
  url: {
    type: String,
    required: [true, 'Url is required']
  },
  likes: {
    type: Number,
    default: 0
  }
}).set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)