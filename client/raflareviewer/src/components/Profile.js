import React from "react"
import { useState, useEffect } from "react"
import UserDefaultAvatar from "../images/UserDefaultAvatar"
import userService from "../services/users";
import Logout from "../images/Logout";
import useData from '../hooks/useData'

/**
 * Komponentti käyttäjän tietojen muutokseen.
 * @param user - Käyttäjä objekti.
 * @param setFName - Funktio, jolla laitetaan etunimi.
 * @param setLName - Funktio, jolla laitetaan sukunimi.
 * @returns {JSX.Element}
 * @constructor
 */
const ProfileBoxOne = ({ user, setFName , setLName }) => {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")

    /**
     * Hoitaa lomakkeen syötön muutoksen.
     * @param event
     */
    const handleChange = (event) => {
        const {name, value} = event.target

        if (name === "firstName") {
            setFirstName(value)
        } else if (name === "lastName") {
            setLastName(value)
        }
    }

    /**
     * Hoitaa lomakkeen tietojen tallentamisen.
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (firstname === "" || lastname === "") {
            alert("Täytä kentät")
            return
        }

        try {
            await userService.updateProfile(user._id, {firstname, lastname})
            console.log('User data updated successfully.' , user._id)
            setFName(firstname)
            setLName(lastname)
            alert("Tiedot vaihdettu")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="profile-box-one">
            <header className="boxFormHeaderOne">
                <h2>Vaihda tietoja</h2>
            </header>
            <div className="profileFormContOne">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="firstName" value={firstname} onChange={handleChange} className="formInput" placeholder="Etunimi"/>
                    </div>
                    <div>
                        <input type="text" name="lastName" value={lastname} onChange={handleChange} className="formInput" placeholder="Sukunimi"/>
                    </div>
                    <button className="button" type="submit">Tallenna</button>
                </form>
            </div>
        </div>
    )
}

/**
 * Komponentti, joka näyttää käyttäjän etu, sukunimen ja avatarin.
 * @param user - Käyttäjä objekti.
 * @param setIsLoggedIn - Funktio, jolla päivitetään kirjautumis status.
 * @param fname - Käyttäjän etunimi.
 * @param lname - Käyttäjän sukunimi.
 * @returns {JSX.Element}
 * @constructor
 */
const ProfileBoxTwo = ({ user, setIsLoggedIn, fname, lname }) => {

    /**
     * Hoitaa käyttäjän kirjautumisen ulos.
     * @param event
     * @returns {Promise<void>}
     */
    const logout = async (event) => {
        event.preventDefault();
        try {
            await userService.handleLogout();
            console.log("kirjautui")
            setIsLoggedIn(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="profile-box-two">
            <div className="avatar-container">
                <UserDefaultAvatar/>
            </div>
            <h3>{user.username}</h3>
            {fname === "" && lname === "" ? (
                <h3>{user.firstname} {user.lastname}</h3>
            ) : (
                <h3>{fname} {lname}</h3>
            )}
            <button onClick={logout} className="logoutBtn">
                <Logout />
                <span>Kirjaudu Ulos</span>
            </button>
        </div>
    )
}

/**
 * Komponentti käyttäjän salasanan muutokseen.
 * @param user - Käyttäjä objekti.
 * @returns {JSX.Element}
 * @constructor
 */
const ProfileBoxThree = ({ user }) => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    /**
     * Hoitaa lomakkeen muutoksen.
     * @param event
     */
    const handleChange = (event) => {
        const { name, value } = event.target

        if (name === "oldPassword") {
            setOldPassword(value)
        } else if (name === "newPassword") {
            setNewPassword(value)
        } else if (name === "confirmPassword") {
            setConfirmPassword(value)
        }
    }

    /**
     * Hoitaa lomakkeen tietojen tallentamisen.
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (newPassword === "" && confirmPassword === "") {
            alert("Täytä kohdat")
            return;
        }

        if (newPassword !== confirmPassword) {
            console.log('Passwords do not match')
            alert("Salasanat eivät ole samat")
            return;
        }

        try {
            await userService.updateProfile(user._id, {
                oldPassword,
                newPassword,
            })
            console.log('Password changed successfully.')
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (error) {
            console.log(error)
            alert("Vanha salasana on väärä")
        }
    }

    return (
        <div className="profile-box-three">
            <header className="boxFormHeaderThree">
                <h2>Vaihda salasanaa</h2>
            </header>
            <div className="profileFormContThree">
                <form onSubmit={handleSubmit}>
                    <input type="password" name="oldPassword" value={oldPassword} onChange={handleChange} className="formInput" placeholder="Vanha salsana"/>
                    <input type="password" name="newPassword" value={newPassword} onChange={handleChange} className="formInput" placeholder="Uusi salasana"/>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} className="formInput" placeholder="Salasana uudestaan"/>
                    <button type="submit" className="button" >Tallenna</button>
                </form>
            </div>
        </div>
    )
}

/**
 * Komponentti, jolla luodaan käyttäjän profiili.
 * @param setIsLoggedIn - - Funktio, jolla päivitetään kirjautumis status.
 * @returns {JSX.Element}
 * @constructor
 */
const Profile = ({ setIsLoggedIn }) => {
    const user = useData()
    const [fname, setFName] = useState("")
    const [lname, setLName] = useState("")

    if (!user) {
        return (
            <div>
                Ladataan käyttäjää
            </div>
        )
    }

    return (
        <div className="profile">
            <h1>Profiili</h1>
            {user && (
                <>
                    <div className="profile-box-one box-style">
                        <ProfileBoxOne user={user} setFName={setFName} setLName={setLName}/>
                    </div>
                    <div className="profile-box-two box-style">
                        <ProfileBoxTwo user={user} setIsLoggedIn={setIsLoggedIn} fname={fname} lname={lname} setFName={setFName} setLName={setLName}/>
                    </div>
                    <div className="profile-box-three box-style">
                        <ProfileBoxThree user={user} />
                    </div>
                </>
            )}
        </div>
    )
}


export default Profile
