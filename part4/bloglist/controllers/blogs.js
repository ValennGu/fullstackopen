const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

const getToken = (req) => {
  const authorization = req.headers.authorization
  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '')
  }

  return null
}

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
    const decodedToken = jwt.verify(getToken(request), SECRET)

    if (!decodedToken.id) {
      return next({ name: 'JsonWebTokenError' })
    }

    const blog = new Blog(request.body)
    const user = await User.findById(decodedToken.id)

    blog.user = user
    user.blogs = [...user.blogs, blog.id]

    const result = await blog.save()
    await user.save()

    response.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/:id', async (request, response, next) => {
  try {
    const likes = request.body.likes
    const blog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true })

    response.status(200).json(blog)
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