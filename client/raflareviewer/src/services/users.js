
import axios from "axios";
const baseUrl = "http://localhost:3001"

const create = newObject => {
    const request = axios.post(`${baseUrl}/users`, newObject)
    console.log("axios success")
    return request.then(response => response.data)
}

const login = async creds => {
    const response = await axios.post(`${baseUrl}/login`, creds)
    const token = response.data.token
    localStorage.setItem('token', token)
    console.log("axios success login", token)
    return response.data
}

const getProfile = async () => {
    try {
        const token = localStorage.getItem('token')
        console.log(token, "lol")
        const response = await axios.get(`${baseUrl}/profile`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Could not get profile data");
    }
}

const handleLogout = async () => {
    try {
        await axios.post(`${baseUrl}/logout`);
    } catch (error) {
        console.log(error);
    }
}

export default {create, login, getProfile, handleLogout}