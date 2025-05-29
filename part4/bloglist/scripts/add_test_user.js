
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { MONGODB_URI, SALT } = require('../utils/config')
const User = require('../models/user')


mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)
  .then(async () => {
    try {
      console.log('[LOG] Connected to database')

      console.log('[LOG] Executing clean up ...')
      await User.deleteMany({})
      console.log('[LOG] Clean up succeded')

      console.log('[LOG] Creating new user ...')
      const newUser = new User({
        name: 'myTest',
        username: 'test',
        passwordHash: await bcrypt.hash('test', Number(SALT))
      })

      console.log('[LOG] Saving new user ...')
      await newUser.save()

      console.log('[LOG] Success')
      console.log('[RESULT] User:', newUser)

      process.exit(1)
    } catch(err) {
      console.log('[ERROR] - ', err)
      process.exit(1)
    }

  }).catch(() => console.error('Could not connect to database'))