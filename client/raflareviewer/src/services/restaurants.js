// Hakee ravintolat

import axios from 'axios'
const baseUrl = 'http://localhost:3001/restaurants'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return await response.data
}

const getRestaurant = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return await response.data
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    console.log('axios success')
    return await response.data
}

const update = async (id, newObject) => {
    const request = await axios.post(`${baseUrl}/${id}`, newObject)
    return await request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

export default { getAll, getRestaurant, create, update }