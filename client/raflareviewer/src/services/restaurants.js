// Hakee ravintolat

import axios from 'axios'
const baseUrl = 'http://localhost:3001/restaurants'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    console.log('axios success')
    return await response.data
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

export default { getAll, create }