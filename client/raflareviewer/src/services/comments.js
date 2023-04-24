// Hakee kommentit

import axios from 'axios'
const baseUrl = 'http://localhost:3001/comments'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getByRestaurant = restaurantId => {
    const request = axios.get(`${baseUrl}/restaurantId/${restaurantId}`)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    console.log('axios success')
    return request.then(response => response.data)
}

/*
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
} */

export default { getAll, getByRestaurant, create }