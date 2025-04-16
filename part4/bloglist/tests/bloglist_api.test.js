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
  test('application data should be returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('should contain mocked number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })
  // test('should have title and author', async () => {
  //   const response = await api.get('/api/blogs')
  //   const blogs = response.body
  //   assert.strictEqual(blogs[0].title, 'The Sample')
  //   assert.strictEqual(blogs[0].author, 'Mr. Coder')
  //   assert.strictEqual(blogs[1].title, 'The Sample 2')
  //   assert.strictEqual(blogs[1].author, 'Mr. Coder')
  // })
})

after(async () => {
  await mongoose.connection.close()
})