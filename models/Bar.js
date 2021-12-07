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
  schedules: {
    monday: {
      start: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      },
      end: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      }
    },
    tuesday: {
      start: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      },
      end: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      }
    },
    wednesday: {
      start: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      },
      end: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      }
    },
    thursday: {
      start: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      },
      end: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      }
    },
    friday: {
      start: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      },
      end: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      }
    },
    saturday: {
      start: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      },
      end: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      }
    },
    sunday: {
      start: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      },
      end: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      }
    }
  }
})

module.exports = mongoose.model('Bar', BarSchema)
