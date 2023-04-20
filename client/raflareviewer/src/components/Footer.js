import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="main-footer">
            <p>Footer</p>
            <NavLink to='./Creators' className="footerlink">Tekijät</NavLink>
        </footer>
    )
}

export default Footer