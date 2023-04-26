import React from "react"
import users from "../services/users"
import {useState, useEffect} from "react"

const Profile = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await users.getProfile();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user.username}</h1>
        </div>
    )
}

export default Profile