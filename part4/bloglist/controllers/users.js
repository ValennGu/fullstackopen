const usersRouter = require('express').Router()
const User = require('./../models/user')
const bcrypt = require('bcrypt')
const { SALT } = require('./../utils/config')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  try {
    const newUser = new User({
      name,
      username,
      passwordHash: await bcrypt.hash(password, Number(SALT))
    })

    await newUser.save()
    response.status(201).send({ message: 'User created successfuly.' })
  } catch (err) {
    next(err)
  }
})

module.exports = usersRouter