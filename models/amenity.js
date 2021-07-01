const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema definition
const AmenitySchema = new Schema({
  name: String,
  value: {
    type: String,
    index: {
      unique: true,
    },
  },
}, {
  timestamps: true,
})

// Model
const AmenityModel = mongoose.model('Amenity', AmenitySchema)
module.exports = { AmenitySchema, AmenityModel }