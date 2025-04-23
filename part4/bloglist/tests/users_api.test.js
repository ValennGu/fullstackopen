const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

const initialUsers = [
  {
    username: 'username',
    name: 'name',
    passwordHash: 'hash'
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User(initialUsers[0])
  await user.save()
})

describe('API / users', () => {
  test('GET: returns the list of users in JSON format', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('GET: returns one user', async () => {
    const response = await api.get('/api/users')
    const users = response.body

    assert.equal(users.length, 1)
  })

  test('POST: adds a user to the list', async () => {
    let response = await api.get('/api/users')
    const initialLength = response.body.length

    const newUser = {
      username: 'new-username',
      name: 'new-name',
      password: 'new-password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    response = await api.get('/api/users')
    const users = response.body

    assert.equal(response.body.length, initialLength + 1)
    assert.ok(users.map(u => u.username).includes(newUser.username))
    assert.ok(users.map(u => u.name).includes(newUser.name))
  })

  test('POST: does not add a user to the list when username is missing', async () => {
    let response = await api.get('/api/users')
    const initialLength = response.body.length

    const newUser = {
      name: 'new-name',
      password: 'new-password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    response = await api.get('/api/users')
    const users = response.body

    assert.equal(response.body.length, initialLength)
    assert.ok(!users.map(u => u.name).includes(newUser.name))
  })

  test('POST: does not add a user to the list when name is missing', async () => {
    let response = await api.get('/api/users')
    const initialLength = response.body.length

    const newUser = {
      username: 'new-username',
      password: 'new-password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    response = await api.get('/api/users')
    const users = response.body

    assert.equal(response.body.length, initialLength)
    assert.ok(!users.map(u => u.username).includes(newUser.username))
  })

  test('POST: does not add a user to the list when password is missing', async () => {
    let response = await api.get('/api/users')
    const initialLength = response.body.length

    const newUser = {
      username: 'new-username',
      name: 'new-name',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    response = await api.get('/api/users')
    const users = response.body

    assert.equal(response.body.length, initialLength)
    assert.ok(!users.map(u => u.username).includes(newUser.username))
    assert.ok(!users.map(u => u.name).includes(newUser.name))
  })

  test('POST: does not add a user to the list when username is less than 3 characters', async () => {
    let response = await api.get('/api/users')
    const initialLength = response.body.length

    const newUser = {
      username: 'ne',
      name: 'new-name',
      password: 'new-password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    response = await api.get('/api/users')
    const users = response.body

    assert.equal(response.body.length, initialLength)
    assert.ok(!users.map(u => u.username).includes(newUser.username))
    assert.ok(!users.map(u => u.name).includes(newUser.name))
  })

  test('POST: does not add a user to the list when password is less than 3 characters', async () => {
    let response = await api.get('/api/users')
    const initialLength = response.body.length

    const newUser = {
      username: 'new-username',
      name: 'new-name',
      password: 'ne'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    response = await api.get('/api/users')
    const users = response.body

    assert.equal(response.body.length, initialLength)
    assert.ok(!users.map(u => u.username).includes(newUser.username))
    assert.ok(!users.map(u => u.name).includes(newUser.name))
  })
})

after(async () => {
  await mongoose.connection.close()
})