const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema definition
const ReviewSchema = new Schema({
  body: String,
  valoration: Number,
  isAnonymous: Boolean,
}, {
  timestamps: true,
})

// Model
const ReviewModel = mongoose.model('Review', ReviewSchema)
module.exports = { ReviewSchema, ReviewModel }