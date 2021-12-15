const router = require('express').Router()

const User = require('../../models/User')

const withAuth = require('../../middlewares/authMiddleware')
const { extractIdFromRequestAuthHeader } = require('../../helpers/TokenHelper')

// Récupère et retourne un user par son id
router.route('/')
  .get(withAuth, (req, res) => {
    const id = extractIdFromRequestAuthHeader(req)

    // Méthode Promesse en retirant le password des retournées par mongodb
    User.findById(id).select('-password')
      .then(result => res.send(result))
      .catch(error => res.status(500).send(error))
  })
  .delete(withAuth, (req, res) => {
    const id = extractIdFromRequestAuthHeader(req)

    // Méthode Promesse en retirant le password des retournées par mongodb
    User.findByIdAndDelete(id).select('-password')
      .then(result => res.send('The user has been deleted'))
      .catch(error => res.status(500).send(error))
  })

module.exports = router
