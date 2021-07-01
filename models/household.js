const mongoose = require('mongoose')
const Schema = mongoose.Shema

// Schema definition
const HouseholdSchema = new Schema({
  title: String,
  status: Boolean,
  price: Number,
  body: String,
  type: String,
  meta: {
    bathrooms: Number,
    rooms: Number,
    parking_slots: Number,
    pet_friendly: Boolean,
    area: Number,
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
  },
  amenities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Amenity',
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, {
  timestamps: true,
})

const HouseholdModel = mongoose.model('Household', HouseholdSchema)
module.exports = { HouseholdModel, HouseholdSchema }