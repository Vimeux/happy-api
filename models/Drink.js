const mongoose = require('mongoose')

const { Schema } = mongoose

// Déclaration du schéma pour les boisson
const DrinkSchema = Schema({
  name: {
    type: String,
    required: true
  },
  drinkType: {
    type: String,
    enum: ['Beer', 'wine', 'cider', 'spirit', 'cocktail', 'soda', 'other'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  happyPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Drink', DrinkSchema)
