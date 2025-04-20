const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'The Sample',
    author: 'Mr. Coder',
    url: 'github.com',
    likes: 1000
  },
  {
    title: 'The Sample 2',
    author: 'Mr. Coder',
    url: 'github.com',
    likes: 1001
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const blogPromises = blogObjects.map(blogObject => blogObject.save())
  await Promise.all(blogPromises)
})

describe('bloglist API', () => {
  test('GET: application data is returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('GET: returns 3 mocked blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })
  test('GET: returns blogswith id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    assert.ok(blogs[0].id)
  })
  test('POST: adds a new blog to the database', async () => {
    let response = await api.get('/api/blogs')
    const initialAmount = response.body.length

    await api
      .post('/api/blogs')
      .send({
        title: 'The Sample 3',
        author: 'Mr. Coder',
        url: 'github.com',
        likes: 1001
      })
      .expect(201)

    response = await api.get('/api/blogs')
    const finalAmount = response.body.length

    assert.equal(finalAmount, initialAmount + 1)
  })
  test('POST: defaults to 0 likes if "likes" is missing in payload', async () => {
    const response = await api
      .post('/api/blogs')
      .send({
        title: 'The Sample 3',
        author: 'Mr. Coder',
        url: 'github.com',
      })

    assert.equal(response.body.likes, 0)
  })

  test('POST: returns 400 if payload does not contain "title"', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'Mr. Coder',
        url: 'github.com',
      })
      .expect(400)
  })

  test('POST: returns 400 if payload does not contain "url"', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'The Sample',
        author: 'Mr. Coder'
      })
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})