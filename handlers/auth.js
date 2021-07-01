const express = require('express')
const bcrypt = require('bcrypt')
const Validator = require('validatorjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { UserModel } = require('../models/user')

// Create an account
router.post('/register', async (req, res) => {
  let {
    name,
    lastname,
    email,
    password,
  } = req.body

  const validation = new Validator(req.body, {
    name: 'required',
    lastname: 'required',
    email: 'required|email',
    password: 'required'
  })

  if (!validation.passes()) {
    const { errors } = validation.errors
    return res.status(400).json({
      errors,
    })
  }

  let user = await UserModel.findOne({
    email
  })

  if (user) {
    return res.status(400).json({
      message: 'This email is already registered',
    })
  }

  // Hashing password
  // $2b$10$4F6LTbyC165PoOU28We.repem209W/vjtbRYNPtJQ803XI1ZG62Oe
  const salt = bcrypt.genSaltSync()
  password = bcrypt.hashSync(password, salt)

  user = new UserModel({
    name,
    lastname,
    email,
    password,
    type: 'client'
  })

  await user.save()
  return res.json({
    message: 'Account created successfuly'
  })
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({
    email
  })

  if (!user) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  const validPassword = bcrypt.compareSync(password, user.password)
  if (!validPassword) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  // Create the jwt token
  const token = jwt.sign({
    iss: 'Hommer SAPI SA de CV',
    id: user.id,
  }, proccess.env.JWT_SECRET_KEY, {
    expiresIn: proccess.env.JWT_TOKEN_EXPIRES,
  })

  return res.json({
    token,
  })
})

module.exports = router
