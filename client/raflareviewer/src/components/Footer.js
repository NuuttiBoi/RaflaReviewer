import { NavLink } from 'react-router-dom'
import ColorThemes from './ColorThemes'

const Footer = () => {
    return (
        <footer className="main-footer">
            <ColorThemes />
            <NavLink to='./Creators' className="footerlink hideOnMobile">Tekijät</NavLink>
            <p>© RaflaReviewer 2023</p>
        </footer>
    )
}

export default Footer