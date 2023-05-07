import { useState, useEffect } from 'react'
import users from "../services/users";

/**
 * Hookki, jolla haetaan käyttäjän tiedot serveriltä.
 * @param isLoggedIn - Boolean, joka näyttää että onko käyttäjä kirjautunut.
 * @returns {unknown} - Antaa käyttäjän tieto objektin tai null, jos ei ole ladannut.
 */
function useData(isLoggedIn) {
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
    }, [isLoggedIn])

    return user
}

export default useData