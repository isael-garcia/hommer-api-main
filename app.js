const express = require('express')
const mongoose = require('mongoose')
const auth = require('./middlewares/authentication')
const helmet = require('helmet');
require('dotenv').config()

// Creating an express application
const app = express()
app.use(helmet())

const APP_PORT = procces.env.PORT || 3000;




// Function to connect to MongoDB
const connectMongoDB = () => mongoose.connect(proces.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

// Decoding
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Getting routes
app.use('/auth', require('./handlers/auth'))
app.use('/reviews', auth, require('./handlers/reviews'))
app.use('/amenities', auth, require('./handlers/amenities'))
app.use('/households', auth, require('./handlers/households'))

app.get('/health', (req, res) => res.json({
  message: 'All systems operational',
}))

connectMongoDB().then(() => {
  // Event listener for Express Server "listening" event
  app.listen(APP_PORT, () => {
    console.log('Hommer API listening on port ${APP_PORT}')
  })
})