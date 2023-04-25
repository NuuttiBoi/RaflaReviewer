import React from "react"
import users from "../services/users"
import {useState, useEffect} from "react"

const Profile = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        users.getProfile().then(data => setUser(data))
    }, [])

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{users.username}</h1>
        </div>
    )
}

export default Profile