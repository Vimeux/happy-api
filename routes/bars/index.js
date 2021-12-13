const router = require('express').Router()

const Bar = require('../../models/Bar')

router.route('/') // correspond à /bar
  // GET (liste les éléments)
  .get((req, res) => {
    // récupéré la liste des bar depuis mongoDB
    Bar.find((error, result) => {
      if (error) {
        return res.status(500).send('Erreur lors de la récupération des bars')
      } else {
        // on retourne la liste des bars
        return res.send(result)
      }
    })
  })
  // POST
  .post((req, res) => {
    const { body } = req
    const { name, address, phone, schedules, happyHours, drink } = body

    if (!name) return res.status(500).send('Name is missing')
    if (!address) return res.status(500).send('Address is missing')
    if (!phone) return res.status(500).send('Phone is missing')
    if (!schedules) return res.status(500).send('Phone is missing')
    if (!happyHours) return res.status(500).send('Phone is missing')

    const bar = new Bar({
      name: name,
      address: address,
      phone: phone,
      schedules,
      happyHours,
      drink
    })

    // enregistrement du bar
    bar.save((error, result) => {
      //
      if (error) res.status(500).send(error)
      // on récupère les bars pour les affichés
      Bar.find((error, result) => {
        if (error) {
          return res.status(500).send('Erreur lors de la récupération des bar')
        } else {
          return res.send(result)
        }
      })
    })
  })
  // DELETE
  .delete((req, res) => {
    // récupère l'id de l'élément à supprimé
    const { body } = req
    const { id } = body

    if (!id) return res.status(500).send('id is missing')

    Bar.findByIdAndDelete(id, (error, result) => {
      if (error) res.status(500).send(error)
      Bar.find((error, result) => {
        if (error) {
          return res.status(500).send('Erreur lors de la récupération des bar')
        } else {
          return res.send(result)
        }
      })
    })
  })
  // UPDATE
  .patch((req, res) => {
    // on prend l'objet entier pour avoir toutes les propriétés
    const { body: { bar } } = req

    if (!bar) return res.status(500).send('bar is missing')

    // on extrait l'id
    const id = bar._id
    // on vérifie l'id
    if (!id) return res.status(500).send('id is missing')
    // on trouve le resto et on le met à jour
    Bar.findByIdAndUpdate(id, bar, (error, result) => {
      if (error) {
        return res.status(500).send('Erreur lors de la récupération des bars')
      } else {
        return res.send(result)
      }
    })
  })

module.exports = router
