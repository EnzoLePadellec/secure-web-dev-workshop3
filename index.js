const express = require('express')
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const localStrategy = require('./auth/local.strategy.js')
const JWTStrategy = require('./auth/jwt.strategy')

app.use(bodyParser.json())
app.use(locationController)
app.use(userController)
const mongoose = require('mongoose')
require('dotenv').config()

app.listen(port, async() => {
	await mongoose.connect(process.env.MONGO_URI);
	console.log("Connexion réussie !");
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})