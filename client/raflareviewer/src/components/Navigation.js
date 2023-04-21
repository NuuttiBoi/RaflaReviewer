import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className="main-nav">
             <div class="nav-wrapper">
                <NavLink to="/" className="title">RaflaReviewer</NavLink>
                <ul>
                    <li>
                        <NavLink to="/" className="navlink">Etusivu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Map2" className="navlink">Kartta</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation