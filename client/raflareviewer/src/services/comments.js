// Hakee kommentit

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/v1/comments'

const getAll = async () => {
    const response = axios.get(baseUrl)
    return await response.data
}

const getByRestaurant = async restaurantId => {
    const response = await axios.get(`${baseUrl}/restaurant/${restaurantId}`)
    return await response.data
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    console.log('axios success')
    return await response.data
}

const deleteComment = async id => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response
}

const deleteByRestaurant = async restaurantId => {
    const response = await axios.delete(`${baseUrl}/restaurant/${restaurantId}`)
    return response
}

export default { getAll, getByRestaurant, create, deleteComment, deleteByRestaurant }