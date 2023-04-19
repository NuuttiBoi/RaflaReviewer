'use strict';

const express = require('express')
const app = express()
const Restaurant = require('./models/restaurant')

app.use(express.json())

app.get('/', function(request, response) {
    response.send('(^ _ ^)/')
})

app.get('/restaurants', (request, response) => {
    Restaurant.find({}).then(restaurants => {
        response.json(restaurants)
    })
})

// Hakee kaikki ravintolat
app.post('/restaurants', (request, response) => {
    const body = request.body

    /* if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    } */

    // Tallennettavan rivin "konstruktori"
    const restaurant = new Restaurant({
        name: body.name,
        address: body.address,
        comment: body.comment
    })

    // Tallennus tietokantaan
    restaurant.save().then(savedRestaurant => {
        console.log('saved to db')
        response.json(savedRestaurant)
    })
})

// Yksittäisen ravintolan hakeminen
app.get('/restaurants/:id', (request, response) => {
    Restaurant.findById(request.params.id).then(restaurant => {
      response.json(restaurant)
    })
})

app.listen(3001)
console.log('Server running on port 3001')

// npm run server reviewer

// node index.js reviewer <- yhdistää vaan db:een