const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
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

let createdUser

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = new User({ username: 'test', name: 'testname', passwordHash: 'pass' })
  await user.save()

  createdUser = user

  const blogObjects = initialBlogs.map(blog => {
    blog.user = user.id
    return new Blog(blog)
  })

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
    assert.ok(response.body[0].user)
    assert.ok(!response.body[0].user.passwordHash)
    assert.equal(response.body[0].user.username, createdUser.username)
    assert.equal(response.body[0].user.name, createdUser.name)
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

  test('DELETE: remmoves an element from the database', async () => {
    let response = await api.get('/api/blogs')
    let blogs = response.body

    const idToDelete = blogs[0].id

    await api
      .delete(`/api/blogs/${idToDelete}`)
      .expect(200)

    response = await api.get('/api/blogs')
    blogs = response.body

    assert.ok(!blogs.map(b => b.id).includes(idToDelete))
  })

  test('UPDATE: updates the likes for a blog', async () => {
    let response = await api.get('/api/blogs')
    let blogs = response.body

    const id = blogs[0].id

    await api
      .post(`/api/blogs/${id}`)
      .send({ likes: 10 })
      .expect(200)

    response = await api.get(`/api/blogs/${id}`)

    assert.equal(response.body.likes, 10)
  })
})

after(async () => {
  await mongoose.connection.close()
})