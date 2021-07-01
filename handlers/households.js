const express = require('express')
const router = express.Router()

// GET /
router.get('/', (req, res) => {
  return res.json({
    results: [],
  })
})

module.exports = router
