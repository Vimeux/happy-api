const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/, // vérifie si il y a un @
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  }
}, { timestamps: true })

// méthode appelé à chaque enregistrement d'utilisateur
UserSchema.pre('save', (next) => {
  // this = user car la fonction save est appelé sur le user dans le code
  const user = this
  // si le MDP à été modifier ou si l'utilisateur est nouveau
  if (this.isModified('password') || this.isNew) {
    // génération du "sel"
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error)
      // Cryptage (hashage du mot de passe)
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error)
        // remplace le MDP par le hash
        user.password = hash
        // on envoie la suite
        return next()
      })
    })
  }
})

UserSchema.methods.comparePassword = (password, callback) => {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) return callback(error)
    callback(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
