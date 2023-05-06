'use strict';

const express = require('express');

const apiv1 = express.Router();

apiv1.get('/api/v1', function(request, response) {
    res.send('moi')
})

apiv1.get('/users', function(request, response) {
    res.send('Täällä lista APIv1-käyttäjistä')
})

module.exports = apiv1;