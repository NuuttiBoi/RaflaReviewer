import { NavLink } from 'react-router-dom'
import AddNewUser from "./AddNewUser"
import AddNewLogin from "./AddNewLogin"
import Hamburger from '../images/Hamburger'

const Navigation = () => {

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
                        <button onClick={openLogin} className="button center"> Kirjaudu</button>
                        <AddNewLogin />
                        <AddNewUser />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation