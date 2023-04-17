'use strict';

const express = require('express')
const app = express()
let data = require('./db.json')

app.use(express.json())

app.get('/', function(req, res) {
    res.send('(^ _ ^)/')
})

// json atm, pitää muuttaa tietokannaksi
app.get('/restaurants', function(req,res) {
    res.json(data)
})

const generateId = () => {
    const maxId = data.length > 0
      ? Math.max(...data.map(n => n.id))
      : 0
    return maxId + 1
  }

app.post('/restaurants', (req, res) => { 
    const body = req.body

    const restaurant = {
        name: body.name,
        address: body.address,
        comment: body.comment,
        id: generateId()
    }

    data = data.concat(restaurant)

    res.json(restaurant)
})

app.listen(3001)
console.log('Server running on port 3001')