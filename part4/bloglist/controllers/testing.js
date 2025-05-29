const testingRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { SALT } = require('../utils/config')

testingRouter.post('/reset', async (request, response) => {
  await User.deleteMany({})
  response.status(200).json({ message: 'Success' })
})

testingRouter.post('/add_user', async (request, response) => {
  const { name, username, password } = request.body
  const newUser = new User({
    name,
    username,
    passwordHash: await bcrypt.hash(password, Number(SALT))
  })

  await newUser.save()
  response.status(201).json({ message: 'User created successfuly.' })
})

module.exports = testingRouter