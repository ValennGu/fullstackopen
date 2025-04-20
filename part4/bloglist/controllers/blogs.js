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

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    response.status(200).json(blog)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter