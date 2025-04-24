const usersRouter = require('express').Router()
const User = require('./../models/user')
const bcrypt = require('bcrypt')
const { SALT } = require('./../utils/config')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate({ path: 'blogs', select: '-user' })
    response.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  /**
   * Since "password" is not stored in the database
   * validation occurs at controller.
   */
  if (!password || password.length < 3) {
    next({ name: 'ValidationError', message: 'Password is shorter than 3' })
  }

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