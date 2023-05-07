import { NavLink } from 'react-router-dom'

/**
 * Popup, jossa kehotetaan käyttäjää kirjautumaan sisään tai luomaan tunnus
 */

const LoginPrompt = () => {

    /**
     * Avaa sisäänkirjautumisikkunan
     */
    const openLogin = (event) => {
        event.preventDefault()
        document.getElementById('loginPrompt').classList.add('visuallyhidden')
        document.getElementById("addNewLogin").classList.remove("visuallyhidden")
        console.log('open login')
    }

    /**
     * Avaa rekisteröitymisikkunan
     */
    const openUser = () => {
        document.getElementById('loginPrompt').classList.add('visuallyhidden')
        document.getElementById("addNewUser").classList.remove("visuallyhidden")
        console.log('open register')
    }

    /**
     * Piilottaa popupin näkyvistä
     */
    const closePopup = () => {
        console.log('close')
        document.getElementById('loginPrompt').classList.add('visuallyhidden')
        document.querySelector('body').classList.remove('locked')
    }

    return (
        <div id="loginPrompt" className="visuallyhidden popup">
            <p className="center">
                <NavLink to="/AddNewLogin" className="popup-link" role="button" onClick={openLogin}>Kirjaudu sisään</NavLink> tai <button onClick={openUser} className="popup-link">rekisteröidy</button> lisätäksesi arviointi
            </p>
            <button className="button center" onClick={closePopup}>Sulje</button>
        </div>
    )
}

export default LoginPrompt