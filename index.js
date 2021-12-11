require('dotenv').config() // sert pour récupérer les données d'un fichier .env

const express = require('express')
const mongoose = require('mongoose')
// const cors = require('cors')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // analyse les données entrante dans l'api, voir la doc express

// const router = express.Router()

const port = process.env.PORT

const mongodbConnectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

// check si il y a une erreur de connection
mongoose.connect(mongodbConnectionString, null, error => {
  if (error) throw Error(error)
})

// connection à la base
const db = mongoose.connection

// ne sera éxécuté qu'une seule fois
db.once('open', () => {
  console.info('Connexion à la base: ok')
})

app.get('/', (req, res) => {
  res.send('Hello World !')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
