
import axios from "axios";
const baseUrl = "http://localhost:3001"

const create = newObject => {
    const request = axios.post(`${baseUrl}/users`, newObject)
    console.log("axios success")
    return request.then(response => response.data)
}

const login = async creds => {
    const response = await axios.post(`${baseUrl}/login`, creds)
    console.log("axios success login")
    return response.data
}

const getProfile = async () => {
    const response = await axios.get(`${baseUrl}/profile`)
    return response.data
}

export default {create, login, getProfile}