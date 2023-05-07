
import axios from "axios";
const baseUrl = "http://localhost:3001"

/**
 * Tekee uuden käyttäjän annetuilla tiedoilla.
 * @param newObject - Käyttäjän tiedot.
 * @returns {Promise<axios.AxiosResponse<any>>} - Käyttäjän uudet tiedot.
 */
const create = newObject => {
    const request = axios.post(`${baseUrl}/users`, newObject)
    return request.then(response => {
        localStorage.setItem('token', response.data.token);
        return response.data;
    })
}

/**
 * Käyttäjän kirjautuminen.
 * @param creds - Käyttäjän kirjautumisen tiedot.
 * @returns {Promise<any>} - Todennetun käyttäjän data.
 */
const login = async creds => {
    const response = await axios.post(`${baseUrl}/login`, creds)
    console.log("axios success login")
    localStorage.setItem('token', response.data.token)
    return response.data
}

/**
 * Hakee todennetun käyttäjän tiedot.
 * @returns {Promise<any>} - Todennetun käyttäjän data.
 */
const getProfile = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${baseUrl}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Could not get profile data");
    }
}

/**
 * Kirjaa käyttäjän ulos.
 * @returns {Promise<void>}
 */
const handleLogout = async () => {
    try {
        localStorage.removeItem("token");
        await axios.post(`${baseUrl}/logout`);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Hakee käyttäjän tiedot ID:n avulla.
 * @param id - Käyttäjän ID, jonka tiedot haetaan.
 * @returns {Promise<any>} - Käyttäjän data.
 */
const getUser = async (id) => {
    const response = await axios.get(`${baseUrl}/users/${id}`)
    return await response.data
}

/**
 * Päivittää todennetun käyttäjän tiedot.
 * @param id - Todennetun käyttäjän ID.
 * @param data - Päivitetty tieto.
 * @returns {Promise<any>} - Todennetun käyttäjän tiedot.
 */
const updateProfile = async (id, data) => {
    const token = localStorage.getItem('token')
    const response = await axios.put(`${baseUrl}/users/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(response.data)
    return response.data
}

export default {create, login, getProfile, handleLogout, getUser, updateProfile}