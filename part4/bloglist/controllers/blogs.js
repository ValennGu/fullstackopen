const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (_request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate({ path: 'user', select: '-passwordHash' })
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
    const user = request.user

    blog.user = user
    user.blogs = [...user.blogs, blog.id]

    const result = await blog.save()
    await user.save()

    // This should not return user.passwordHash
    response.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/:id', async (request, response, next) => {
  try {
    const likes = request.body.likes
    const blog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true }).populate({ path: 'user', select: '-passwordHash' })

    response.status(200).json(blog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate({ path: 'user', select: '-passwordHash' })

    if (!blog) {
      return next({ name: 'NotFound', message: 'Blog does not exist.' })
    }

    if (blog.user.id === request.user.id) {
      await blog.deleteOne()
      response.status(200).json(blog)
    } else {
      next({ name: 'Unauthorized', message: `User "${request.user.username}" does not have access to delete the Blog.` })
    }

  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter
