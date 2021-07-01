const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/user')

const authentication = (req, res, next) => {
  const {
    authorization: token,
  } = req.headers

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  jwt.verify(token, proccess.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' })

    req.user = await UserModel.findById(decoded.id)
    next()
  })
}

module.exports = authentication
