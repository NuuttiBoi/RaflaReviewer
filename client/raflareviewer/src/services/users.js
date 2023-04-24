
import axios from "axios";
const baseUrl = "http://localhost:3001/users"
const loginUrl = "http://localhost:3001/login"

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    console.log("axios success")
    return request.then(response => response.data)
}

const login = async creds => {
    const response = await axios.post(loginUrl, creds)
    console.log("axios success login")
    return response.data
}

export default {create, login}