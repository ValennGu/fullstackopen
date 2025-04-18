const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (_request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter