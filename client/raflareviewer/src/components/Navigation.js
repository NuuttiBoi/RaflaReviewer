import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className="main-nav">
            <a href="/" className="title">RaflaReviewer</a>
            <ul>
                <li><a href="/" className="navlink">Etusivu</a></li>
                <li><a href="/Sivu2" className="navlink">Sivu2</a></li>
            </ul>
        </nav>
    )
}

export default Navigation