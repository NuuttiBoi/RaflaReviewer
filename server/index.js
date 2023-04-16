'use strict';

const express = require('express')
const app = express()
const data = require('./db.json')

app.get('/', function(req, res) {
    res.send('(^ _ ^)/')
})

// json atm, pitää muuttaa tietokannaksi
app.get('/restaurants', function(req,res) {
    res.json(data)
})

app.listen(3001)
console.log('Server running on port 3001')