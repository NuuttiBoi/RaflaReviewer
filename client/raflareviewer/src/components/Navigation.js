import { NavLink } from 'react-router-dom'
import AddNewUser from "./AddNewUser"
import AddNewLogin from "./AddNewLogin"

const Navigation = () => {
    const openUser = (event) => {
        event.preventDefault()
        document.getElementById("addNewUser").classList.remove("visuallyhidden")
        console.log("open form")
    }

    const openLogin = (event) => {
        event.preventDefault()
        document.getElementById("addNewLogin").classList.remove("visuallyhidden")
        console.log("open form")
    }
    return (
        <nav className="main-nav">
             <div className="nav-wrapper">
                <NavLink to="/" className="title">RaflaReviewer</NavLink>
                <ul>
                    <li>
                        <NavLink to="/" className="navlink">Etusivu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Map" className="navlink">Kartta</NavLink>
                    </li>
                    <li>
                        <button onClick={openUser} className="button center"> Rekistöröidy</button>
                        <AddNewUser/>
                    </li>
                    <li>
                        <button onClick={openLogin} className="button center"> Kirjaudu</button>
                        <AddNewLogin/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation