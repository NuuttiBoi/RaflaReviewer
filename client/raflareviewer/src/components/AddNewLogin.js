import { useState } from "react"
import userService from "../services/users"
import Icon from '../images/x'
import AddNewUser from "./AddNewUser"

const AddNewLogin = () => {
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [userExists, setUserExists] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    function closeForm() {
        console.log("close")
        document.getElementById("addNewLogin").classList.add("visuallyhidden")

        setNewUsername("")
        setNewPassword("")
        setUserExists(false)
    }

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
                console.log("success", response.data)
                setNewUsername("")
                setNewPassword("")
                setUserExists(false)
                setLoggedIn(true)
            })
            .catch(error => {
                console.log(error)
                if (error.response && error.response.status === 401){
                    alert("Username already taken.")
                    setUserExists(true)
                }
            })

        console.log("saving login")

        closeForm()

    }

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
            <form onSubmit={saveForm}>
                <div>
                    <label htmlFor="username">Käyttäjänimi</label>
                    <input
                        id="username"
                        type="text"
                        value={newUsername}
                        onChange={handleChange}
                        className="formInput"
                    />
                    {userExists && <div style={{color: 'red'}}> Username already taken</div>}
                </div>
                <div>
                    <label htmlFor="password">Salasana</label>
                    <input
                        id="password"
                        type="password"
                        value={newPassword}
                        onChange={handleChange}
                        className="formInput"
                    />
                </div>
                <button type="button" onClick={openUser} > Luo tili</button>


                <button type="submit" className="button center">Tallenna</button>
            </form>
        </div>
    )
}

export default AddNewLogin