import React from "react"
import users from "../services/users"
import { useState, useEffect } from "react"
import UserDefaultAvatar from "../images/UserDefaultAvatar"
import userService from "../services/users";
import Logout from "../images/Logout";


const Profile = ({setIsLoggedIn}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await users.getProfile()
                setUser(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    if (!user) {
        return (
            <div>
                Ladataan käyttäjää
            </div>
        )
    }

    const logout = async (event) => {
        event.preventDefault();
        try {
            await userService.handleLogout();
            console.log("kirjautui")
            setIsLoggedIn(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="profile">
            <h1>Profiili</h1>
            <div className="user-info">
                <div className="avatar-container">
                    {user?.avatar ? (
                        <img src={user.avatar} alt="User avatar" className="avatar" />
                    ) : (
                        <UserDefaultAvatar/>
                    )}
                </div>
                <div className="user-details">
                    <h2>{user?.username}</h2>
                    <p>{user?.firstname} {user?.lastname}</p>
                </div>
            </div>
            <div>
                <button onClick={logout} className="logoutBtn">
                    <Logout />
                    <span>Kirjaudu Ulos</span>
                </button>
            </div>

        </div>
    )
}

export default Profile
