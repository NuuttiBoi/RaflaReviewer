import { NavLink } from 'react-router-dom'
import AddNewUser from "./AddNewUser"
import AddNewLogin from "./AddNewLogin"
import Hamburger from '../images/Hamburger'
import UserIcon from "../images/UserIcon"
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap' sori tää import crashas koko apin :'D
import {useState} from "react";
import {useEffect} from "react"
import useData from '../hooks/useData'
import React from 'react';

const Navigation = ({isLoggedIn, setIsLoggedIn}) => {
    const user = useData(isLoggedIn) || {}

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
        document.getElementById('main-nav-links').classList.toggle('hideOnMobile')
    }

    //Jos ei saada username näkyy "Ladataan"
    const renderUsername = () => {
        if (user.username && user.username.length > 0) {
            return (
                <>
                    <UserIcon />
                    {user.username}
                </>
            )
        } else {
            return 'Ladataan..'
        }
    }

    return (
        <nav className="main-nav">
             <div className="nav-wrapper">
                <div className="nav-header">
                    <NavLink to="/" className="title">RaflaReviewer</NavLink>
                    <button id="mobileMenu" className="mobileMenu" onClick={toggleMenu}><Hamburger /></button>
                </div>
                <ul id="main-nav-links" className="hideOnMobile">
                    <li>
                        <NavLink to="/" className="navlink">Hae ravintoloita</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Map" className="navlink">Kartta</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Creators" className="navlink mobileOnly">Tekijät</NavLink>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <NavLink to="/profile" className="loginButton">
                                {renderUsername()}
                            </NavLink>
                        ) : (
                            <NavLink to="/AddNewLogin" className="loginButton" role="button" onClick={openLogin}>
                                <UserIcon/>Kirjaudu
                            </NavLink>
                        )}
                        <AddNewLogin setIsLoggedIn={setIsLoggedIn}/>
                        <AddNewUser setIsLoggedIn={setIsLoggedIn}/>
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