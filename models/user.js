const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema definition
const UserSchema = new Schema({
  name: String,
  lastname: String,
  type: String,
  email: {
    type: String,
    index: {
      unique: true,
    },
  },
  password: String,
}, {
  timestamps: true,
})

// Model
const UserModel = mongoose.model('User', UserSchema)
module.exports = { UserSchema, UserModel }