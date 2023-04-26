import { NavLink } from 'react-router-dom'
import AddNewUser from "./AddNewUser"
import AddNewLogin from "./AddNewLogin"
import Hamburger from '../images/Hamburger'
import UserIcon from "../images/UserIcon"
import {useState} from "react";
import {useEffect} from "react"
import users from "../services/users"


const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
    const [user, setUser] = useState(null)

    const openLogin = (event) => {
        event.preventDefault()
        document.getElementById("addNewLogin").classList.remove("visuallyhidden")
        console.log("open form")
    }

    const toggleMenu = (event) => {
        event.preventDefault()
        document.getElementById('main-nav-links').classList.toggle('hideMenu')
    }

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

    return (
        <nav className="main-nav">
             <div className="nav-wrapper">
                <div className="nav-header">
                    <NavLink to="/" className="title">RaflaReviewer</NavLink>
                    <button id="mobileMenu" className="mobileMenu" onClick={toggleMenu}><Hamburger /></button>
                </div>
                <ul id="main-nav-links" className="hideMenu">
                    <li>
                        <NavLink to="/" className="navlink">Hae ravintoloita</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Map" className="navlink">Kartta</NavLink>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <NavLink to="/profile" className="loginButton">
                                <UserIcon/>{user.username}
                            </NavLink>
                        ) : (
                            <NavLink to="/AddNewLogin" className="loginButton" role="button" onClick={openLogin}>
                                <UserIcon/>Kirjaudu
                            </NavLink>
                        )}
                        <AddNewLogin setIsLoggedIn={setIsLoggedIn}/>
                        <AddNewUser />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation