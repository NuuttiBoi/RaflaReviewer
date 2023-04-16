'use strict';

const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('(^ _ ^)/')
})

// esimerkkidataa atm, pitää muuttaa tietokannaksi
app.get('/restaurants', function(req,res) {
    res.json({
        "restaurants": [
          {
            "name": "ravintola1",
            "address": "joku osoite",
            "id": 1
          },
          {
            "name": "ravintola2",
            "address": "esimerkkiosoite",
            "id": 2
          }
        ]
      })
})

app.listen(3001)
console.log('Server running on port 3001')