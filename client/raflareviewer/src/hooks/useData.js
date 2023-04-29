import { useState, useEffect } from 'react'
import users from "../services/users";

function useData() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await users.getProfile()
                setUser(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUser()
    }, [])

    return user
}

export default useData