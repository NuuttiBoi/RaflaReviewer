import { NavLink } from 'react-router-dom'
import AddNewUser from "./AddNewUser"
import AddNewLogin from "./AddNewLogin"
import Hamburger from '../images/Hamburger'
import UserIcon from "../images/UserIcon"
import {useState} from "react";
import {useEffect} from "react"
import useData from '../hooks/useData'
import React from 'react';
import Logo from '../images/Logo.js'

/**
 * Navigaatio komponentti, joka näyttää linkkejä eri sivuihin.
 * Mobiili menu nappi, jota painamalla näkee linkit.
 *
 * @param isLoggedIn - Boolean, joka näyttää että onko käyttäjä kirjautunut.
 * @param setIsLoggedIn - Funktio, jolla päivitetään kirjautumis status.
 * @returns {JSX.Element}
 * @constructor
 */
const Navigation = ({isLoggedIn, setIsLoggedIn}) => {
    const user = useData(isLoggedIn) || {}

    /**
     * Funktio, jolla avataan käyttäjän kirjautuminen.
     * @param event - Klick eventti.
     */
    const openLogin = (event) => {
        event.preventDefault()
        document.getElementById("addNewLogin").classList.remove("visuallyhidden")
        console.log("open form")
    }

    /**
     * Funktio, jolla avataan mobiili menu.
     * @param event
     */
    const toggleMenu = (event) => {
        event.preventDefault()
        document.getElementById('main-nav-links').classList.toggle('hideOnMobile')
    }

    /**
     * Funktio, jolla näytetään "Ladataan..." jos username ei ole saatavilla.
     * @returns {JSX.Element|string} - Käyttäjä icon ja käyttäjänimi tai "Ladataan..."
     */
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
                    <NavLink to="/" className="title-wrapper">
                        <Logo />
                        <span className="title">RaflaReviewer</span>
                    </NavLink>
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
                        <NavLink to="/Creators" className="navlink mobileOnly">Tietoa</NavLink>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <NavLink to="/profile" className="loginButton loggedIn navlink">
                                {renderUsername()}
                            </NavLink>
                        ) : (
                            <NavLink to="/AddNewLogin" className="loginButton navlink" role="button" onClick={openLogin}>
                                <UserIcon/>Kirjaudu
                            </NavLink>
                        )}
                        <AddNewLogin setIsLoggedIn={setIsLoggedIn}/>
                        <AddNewUser setIsLoggedIn={setIsLoggedIn}/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation

