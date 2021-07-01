// app.get('/', permissions('admin', 'client'), (req, res) => {})
// HOF -> High Order Functions
const permissions = (...allowedRoles) => {
  // ['admin', 'client']
  return (req, res, next) => {
    const { user } = req
    // ['admin', 'client'].includes('client')
    if (user && allowedRoles.includes(user.type)) {
      return next()
    }

    // HTTP Forbidden
    return res.status(403).json({
      message: 'Forbidden',
    })
  }
}

module.exports = permissions
