const express = require('express')
const Validator = require('validatorjs')
const router = express.Router()
const { AmenityModel } = require('../models/amenity')
const permissions = require('../middlewares/permissions')

// Get all amenities
router.get('/', permissions('admin', 'client'), async (req, res) => {
  const amenities = await AmenityModel.find()
  return res.json({
    results: amenities,
  })
})

// Get an specific amenity by id
router.get('/:id', permissions('admin', 'client'), async (req, res) => {
  const { id } = req.params
  const amenity = await AmenityModel.findById(id)

  if (!amenity) {
    return res.status(404).json({
      message: 'Amenity not found',
    })
  }

  return res.json({
    data: amenity,
  })
})

// Create a new amenity
router.post('/', permissions('admin'), async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      name: 'required',
      value: 'required',
    })
  
    if (!validation.passes()) {
      const { errors } = validation.errors;
      return res.status(400).json({
        errors,
      })
    }
    
    const { name, value } = req.body
    const amenity = new AmenityModel({
      name,
      value,
    })
    await amenity.save() // Save the data in mongo db
  
    return res.status(201).json()
  } catch (e) {
    return res.status(400).json({
      code: e.code,
      message: e.message,
    })
  }
})

// Update amenity by id
router.put('/:id', permissions('admin'), async (req, res) => {
  const { id } = req.params

  const validation = new Validator(req.body, {
    name: 'required',
    value: 'required',
  })

  if (!validation.passes()) {
    const { errors } = validation.errors;
    return res.status(400).json({
      errors,
    })
  }

  const { name, value } = req.body
  const amenity = await AmenityModel.findByIdAndUpdate(id, {
    name,
    value,
  }, { new: true })

  if (!amenity) {
    return res.status(404).json({
      message: 'Amenity not found',
    })
  }

  return res.json({
    data: amenity,
  })
})

// Delete amenity by id
router.delete('/:id', permissions('admin'), async (req, res) => {
  const { id } = req.params
  await AmenityModel.findByIdAndDelete(id)

  return res.json({
    message: 'Resource deleted',
  })
})

module.exports = router
