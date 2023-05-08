import { useState } from "react"
import userService from "../services/users"
import Icon from '../images/x'

/**
 * Komponentti siään kijautumista varten.
 * @param setIsLoggedIn - Funktio, jolla päivitetään kirjautumis status.
 * @returns {JSX.Element}
 * @constructor
 */

const AddNewLogin = ({setIsLoggedIn}) => {
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [userExists, setUserExists] = useState(false)

    /**
     * Sulkee kirjautumisen lomakkeen.
     */
    function closeForm() {
        console.log("close")
        document.getElementById("addNewLogin").classList.add("visuallyhidden")
        document.querySelector('body').classList.remove('locked')

        setNewUsername("")
        setNewPassword("")
        setUserExists(false)
    }

    /**
     * Hoitaa lomakkeen tietojan tallentamisen.
     * @param event
     */
    const saveForm = (event) => {
        event.preventDefault()
        console.log("save")

        const newUser = {
            username: newUsername,
            password: newPassword,
        }

        userService
            .login(newUser)
            .then(response => {
                console.log("success", response)
                setNewUsername("")
                setNewPassword("")
                setUserExists(false)
                setIsLoggedIn(true)
                closeForm()
            })
            .catch(error => {
                console.log(error)
                if (error.response && error.response.status === 401){
                    setUserExists(true)
                }
            })

        console.log("saving login")
    }

    /**
     * Hoitaa lomakkeen syötön muutoksen.
     * @param event
     */
    const handleChange = (event) => {
        switch (event.target.id) {
            case 'username':
                setNewUsername(event.target.value)
                setUserExists(false)
                break;
            case 'password':
                setNewPassword(event.target.value)
                break;
        }
    }

    /**
     * Avaa rekistöröitymisen lomakkeen ja sulkeaa kirjautumisen lomakkeen.
     * @param event
     */
    const openUser = (event) => {
        event.preventDefault()
        document.getElementById("addNewUser").classList.remove("visuallyhidden")
        console.log("open form")
        closeForm()
    }

    return (
        <div id="addNewLogin" className="visuallyhidden popup addNewForm">
            <header className="formHeader">
                <h2>Kirjaudu Sisään</h2>
                <button type="button" onClick={closeForm} className="closeButton">
                    <Icon/>
                </button>
            </header>
            <div className="loginFormCont">
            <form onSubmit={saveForm}>
                {userExists && <div style={{color: 'red'}}> Väärä käyttäjänimi/salasana</div>}
                <div className="usernameInput">
                    <label htmlFor="username">Käyttäjänimi</label>
                    <input
                        id="username"
                        type="text"
                        value={newUsername}
                        onChange={handleChange}
                        className="formInput"
                    />
                </div>
                <div className="passwordInput">
                    <label htmlFor="password">Salasana</label>
                    <input
                        id="password"
                        type="password"
                        value={newPassword}
                        onChange={handleChange}
                        className="formInput"
                    />
                </div>
                <button type="button" onClick={openUser} className="userBtn"> Luo tili</button>
                <button id="submitBtn" type="submit" className="button center">Kirjaudu sisään</button>
            </form>
            </div>
        </div>

    )
}

export default AddNewLogin