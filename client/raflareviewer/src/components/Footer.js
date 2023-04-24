import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="main-footer">
            <NavLink to='./Creators' className="footerlink">Tekijät</NavLink>
            <p>© RaflaReviewer 2023</p>
        </footer>
    )
}

export default Footer