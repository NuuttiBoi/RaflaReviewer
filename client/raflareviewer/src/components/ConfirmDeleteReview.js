import Icon from '../images/x'
import { NavLink } from 'react-router-dom'

// "Vahvista että haluat poistaa arvostelun" -popup

const ConfirmDeleteReview = ({ onClick }) => {

    function closePopup() {
        document.getElementById('confirmDeletePopup').classList.add('visuallyhidden')
        document.querySelector('body').classList.remove('locked')
    }

    // Parametrina saatu onClick-funktio poistaa ravintolan ja kommentit ja käyttäjä palautetaan etusivulle

    return (
        <div id="confirmDeletePopup" className="visuallyhidden popup">
            <header className="formHeader">
                <button onClick={closePopup} className="closeButton">
                    <Icon />
                </button>
            </header>
            <p className="center">Arvostelun poistaminen poistaa myös kaikki kommentit. Haluatko varmasti poistaa arvostelun?</p>
            
            <NavLink to="/" className="button center"onClick={onClick}>Poista</NavLink>
        </div>
    )
}

export default ConfirmDeleteReview