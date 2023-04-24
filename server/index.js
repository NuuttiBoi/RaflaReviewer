'use strict';

const express = require('express')
const app = express()
const Restaurant = require('./models/restaurant')
const Comment = require('./models/comment');

app.use(express.json())

/* CORS ongelman korjaamiseen */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (request, response) => {
    response.send('(^ _ ^)/')
})


// Ravintolat

// Hakee kaikki ravintolat
app.get('/restaurants', (request, response) => {
    Restaurant.find({}).then(restaurants => {
        response.json(restaurants)
    })
})

// Ravintolan tallennus
app.post('/restaurants', (request, response) => {
    const body = request.body

    /* if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    } */

    // Tallennettavan rivin "konstruktori"
    const restaurant = new Restaurant({
        name: body.name,
        address: body.address
    })

    // Tallennus tietokantaan
    restaurant.save().then(savedRestaurant => {
        console.log('saved to db')
        response.json(savedRestaurant)
    })
})

// Hakee yksittäisen ravintolan
app.get('/restaurants/:id', (request, response) => {
    Restaurant.findById(request.params.id).then(restaurant => {
      response.json(restaurant)
    })
})

app.get('/restaurants/comment/:comment', (request, response) => {
    Restaurant.find({ comment: request.params.comment} ).then(restaurant => {
      response.json(restaurant)
    })
})


// Kommentit

// Hakee kaikki kommentit
app.get('/comments', (request, response) => {
    Comment.find({}).then(comments => {
        response.json(comments)
    })
})

app.post('/comments', (request, response) => {
    const body = request.body

    const comment = new Comment({
        restaurantId: body.restaurantId,
        userId: body.userId,
        content: body.content,
        date: new Date()
    })

    comment.save().then(savedComment => {
        console.log('comment saved to db')
        response.json(savedComment)
    })
})

// Hakee yksittäisen kommentin
app.get('/comments/:id', (request, response) => {
    Comment.findById(request.params.id).then(comment => {
      response.json(comment)
    })
})

// Hakee kaikki ravintolan kommentit
app.get('/comments/restaurantId/:restaurantId', (request, response) => {
    Comment.find({ restaurantId: request.params.restaurantId } ).then(comments => {
      response.json(comments)
    })
})

app.listen(3001)
console.log('Server running on port 3001')

// npm run server reviewer

// node index.js reviewer <- yhdistää vaan db:een