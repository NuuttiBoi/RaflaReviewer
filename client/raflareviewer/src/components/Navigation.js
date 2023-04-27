import { NavLink } from 'react-router-dom'
import AddNewUser from "./AddNewUser"
import AddNewLogin from "./AddNewLogin"
import Hamburger from '../images/Hamburger'
import UserIcon from "../images/UserIcon"
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap' sori tää import crashas koko apin :'D
import {useState} from "react";
import {useEffect} from "react"
import userData from './UserData'
import React from 'react';

const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
    const user = userData() || {}

    const [darkMode, setDarkMode] = useState(true);

    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);



    const openLogin = (event) => {
        event.preventDefault()
        document.getElementById("addNewLogin").classList.remove("visuallyhidden")
        console.log("open form")
    }

    const toggleMenu = (event) => {
        event.preventDefault()
        document.getElementById('main-nav-links').classList.toggle('hideMenu')
    }

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
                    <li>
                        <div className={`App ${theme}`}>
                            <button id="darkmodeBtn" onClick={toggleTheme}>
                                Darkmode</button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation