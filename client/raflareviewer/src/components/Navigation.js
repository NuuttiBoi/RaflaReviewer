import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className="main-nav">
            <NavLink to="/" className="title">RaflaReviewer</NavLink>
            <ul>
                <li>
                    <NavLink to="/" className="navlink">Etusivu</NavLink>
                </li>
                <li>
                    <NavLink to="/Sivu2" className="navlink">Sivu2</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation