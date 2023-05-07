// Hakee kommentit

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/v1/comments'

/**
 * Antaa taulukon kaikista kommenteista.
 * @returns {Promise<*>}
 */
const getAll = async () => {
    const response = axios.get(baseUrl)
    return await response.data
}

/**
 * Antaa taulukon kommenteista ID:llä.
 * @param restaurantId - Ravintolan ID, jonka kommentit haetaan.
 * @returns {Promise<any>}
 */
const getByRestaurant = async restaurantId => {
    const response = await axios.get(`${baseUrl}/restaurant/${restaurantId}`)
    return await response.data
}

/**
 * Luo uuden kommentin.
 * @param newObject - Uusi kommentti objekti, joka luodaan.
 * @returns {Promise<any>}
 */
const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    console.log('axios success')
    return await response.data
}

/**
 * Poistaa kommentin ID:llä.
 * @param id - Kommentin ID, joka poistetaan.
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const deleteComment = async id => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response
}

/**
 * Poistaa kaikki kommentit ravintolan ID:llä.
 * @param restaurantId - Ravintolan ID, jonka kommentit poistetaan.
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const deleteByRestaurant = async restaurantId => {
    const response = await axios.delete(`${baseUrl}/restaurant/${restaurantId}`)
    return response
}

export default { getAll, getByRestaurant, create, deleteComment, deleteByRestaurant }