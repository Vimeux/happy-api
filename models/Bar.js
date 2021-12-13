const mongoose = require('mongoose')

const { Schema } = mongoose

const BarSchema = Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: true
  },
  schedules: [{
    day: {
      type: String,
      enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    },
    periods: {
      start: {
        type: Number,
        min: 0,
        max: 23
      },
      end: {
        type: Number,
        min: 0,
        max: 23
      }
    }
  }]
}, { timestamps: true })

module.exports = mongoose.model('Bar', BarSchema)
