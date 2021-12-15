const router = require('express').Router()

// librarie de gestion des tokens
const { generateToken } = require('../../helpers/TokenHelper')

const User = require('../../models/User')

router.route('/register')
  // POST (pour s'inscrire)
  .post((req, res) => {
    // récupération des paramètres
    const { email, password, firstName, lastName, phone } = req.body
    // gestion des erreus si data manquantes
    if (!email || !password || !firstName || !lastName) return res.status(500).send('Missing datas')

    // Création de l'utilisateur
    const user = new User({
      email, password, firstName, lastName, phone
    })

    // Enregistrement de l'utilisateur, ici la fonction save() va faire appel à la méthode de hachage du mot de passe
    user.save((error, result) => {
      if (error) return res.status(500).send(error)
      // on convertit le document MongoDB en objet JS
      const _user = result.toObject()
      // On supprime le mot de passe présent de l'objet (sécurité)
      delete _user.password
      // génération d'un token
      const payload = {
        id: _user._id
      }
      generateToken(payload, (error, token) => {
        if (error) return res.status(500).send('Error while genrating token')
        // on renvoie l'utilisateur créé et le token
        return res.send({
          _user, token
        })
      })
    })
  })

router.route('/login')
  // POST (pour se connecter)
  .post((req, res) => {
    // récupérer les paramètre envoyé pour la connexion
    const { email, password } = req.body

    if (!email || !password) return res.status(500).send('email or password is missing')

    // récupéré l'utilisateur (findOne par email)
    User.findOne({ email }, (error, user) => {
      if (error || !user) return res.status(403).send('invalid credential')
      // on compare les MDP avec compare comparePassword
      user.comparePassword(password, (error, isMatch) => {
        if (error || !isMatch) return res.status(403).send('invalid credentials')
        // Si MDP correct, on génère un token et on l'envoit
        // on convertit le document MongoDB en objet JS
        user = user.toObject()
        // on supprime le mot de passe présent de l'objet (sécurité)
        delete user.password
        // Donnée à stocker dans le token
        const payload = {
          id: user._id
        }
        // génération du token
        generateToken(payload, (error, token) => {
          if (error) return res.status(500).send('Error while genrating token')
          return res.send({
            user, token
          })
        })
      })
    })
  })

module.exports = router
