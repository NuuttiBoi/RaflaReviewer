// Hakee ravintolat

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/v1/restaurants'

/**
 * Hakee kaikki ravontolat.
 * @returns {Promise<any>}
 */
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return await response.data
}

/**
 * Hakee yksittäisen ravintolan ID:llä.
 * @param id - Ravintolan ID, joka haetaan.
 * @returns {Promise<any>}
 */
const getRestaurant = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return await response.data
}

/**
 * Luo uuden ravintolan.
 * @param newObject - Objekti, jonka sisällä ravintolan tiedot, joka luodaan.
 * @returns {Promise<any>}
 */
const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    console.log('axios success')
    return await response.data
}

/**
 * Päivittää ravintolan sen ID:llä.
 * @param id - Ravintolan ID, joka päivitetään.
 * @param newObject - Tiedot, jonka avulla päivitetään.
 * @returns {Promise<any>}
 */
const updateRestaurant = async (id, newObject) => {
    console.log('axios, id: ', id)
    console.log('axios, newObj: ', newObject)

    const response = await axios.patch(`${baseUrl}/${id}`, newObject)
    return await response.data
}

/**
 * Ravintolan poisto ID:llä.
 * @param id - Ravintolan ID, joka poistetaan.
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const deleteRestaurant = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response
}

export default { getAll, getRestaurant, create, updateRestaurant, deleteRestaurant }