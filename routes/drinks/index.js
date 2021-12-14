const router = require('express').Router()

const Drink = require('../../models/Drink')
const Bar = require('../../models/Bar')

router.route('/') // correspond à /drink
  // GET
  .get((req, res) => {
    const id = req.query.id
    // si il y a un id
    if (id) {
      // Récupération des boisson pour 1 bar
      Drink.find({ bar: id }, (error, result) => {
        if (error) return res.status(500).send('Error during recovery')
        return res.send(result)
      })
    } else {
      // sinon on récupere toutes les boissons
      Drink.find((error, result) => {
        if (error) return res.status(500).send('Error during recovery')
        return res.send(result)
      })
    }
  })
  // POST
  .post((req, res) => {
    const { body } = req
    const { name, drinkType, price, happyPrice, bar } = body

    if (!name || !drinkType || !price || !happyPrice || !bar) return res.send(500).send('A data is missing')

    const drink = new Drink({
      name, drinkType, price, happyPrice, bar
    })

    drink.save((error, result) => {
      if (error) return res.status(500).send(error)
      // lien vers le bar
      Bar.findById(bar, (error, bar) => {
        if (error) return res.status(500).send(error)
        // on ajoute la boisson dans le bar
        bar.drink.push(drink)
        // on enregistre le bar
        bar.save((error, result) => {
          if (error) return res.status(500).send(error)
          // on renvoit la liste des boisson
          Drink.find((error, result) => {
            if (error) return res.status(500).send('error during recovery')
            return res.send(result)
          })
        })
      })
    })
  })
  // DELETE
  .delete((req, res) => {
    const { body: { id } } = req

    if (!id) return res.send(500).send('Id is missing')

    Drink.findByIdAndDelete(id, (error, result) => {
      if (error) res.status(500).send(error)
      Drink.find((error, result) => {
        if (error) res.status(500).send('error during recovery')
        return res.send(result)
      })
    })
  })
  // Update
  .patch((req, res) => {
    const { body: { drink } } = req

    if (!drink) return res.send(500).send('Missing Datas')

    const id = drink._id

    if (!id) return res.status(500).send('Id is missing')

    Drink.findByIdAndUpdate(id, drink, (error, result) => {
      if (error) return res.send(500).send(error)
      Drink.find((error, result) => {
        if (error) return res.send(500).send('error during recovery')
        return res.send(result)
      })
    })
  })

module.exports = router
