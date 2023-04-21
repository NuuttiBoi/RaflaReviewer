// Lisää uusi arvostelu -lomake

import { useState } from 'react'
import resService from '../services/restaurants'
import Icon from '../images/x'

const AddNewForm = () => {
    // Kenttien tiedot
    const [newName, setNewName] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newComment, setNewComment] = useState('')

    // Tyhjien kenttien tarkistus
    function checkFields() {
        const requiredFields = document.getElementById('addNewForm').querySelectorAll('.required > input')

        let ok = true;
        requiredFields.forEach(input => {
            if (input.value.trim().length === 0) {
                ok = false
            }
        })
        return ok
    }

    // Piilottaa lomakkeen näkyvistä
    function closeForm() {
        console.log('close')
        document.getElementById('addNewForm').classList.add('visuallyhidden')
        document.querySelector('body').classList.remove('locked')
    }

    // Tallentaa tiedot ja piilottaa lomakkeen
    const saveForm = (event) => {
        event.preventDefault()
        console.log('save')

        // Jos pakolliset kentät ok
        if (checkFields()) {
            // Uusi tallennettava olio
            const newRestaurant = {
                name: newName,
                address: newAddress,
                comment: newComment
            }

            // Lähetys palvelimelle
            resService
                .create(newRestaurant)
                .then(response => {
                    console.log('success')
                })
                .catch(error => {
                    console.log(error)
            })
            
            console.log('saving ', newRestaurant)
            closeForm()
        } else {
            document.getElementById('addNewForm').querySelector('.warningText').style.opacity = '1'
        }
    }

    // Kenttien tilojen päivitys
    // Nimi
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    // Osoite
    const handleAddressChange = (event) => {
        console.log(event.target.value)
        setNewAddress(event.target.value)
    }

    // Kommentti
    const handleCommentChange = (event) => {
        console.log(event.target.value)
        setNewComment(event.target.value)
    }

    return (
        <div id="addNewForm" className="visuallyhidden popup addNewForm">
            <header className="formHeader">
                <h2>Lisää arvostelu</h2>
                <button onClick={closeForm} className="closeButton">
                    <Icon />
                </button>
            </header>
            <p className="warningText">Täytä pakolliset kentät</p>
            <form onSubmit={saveForm}>
                <div className="required">
                    <label><p>Nimi</p></label>
                    <input onChange={handleNameChange} className="formInput"/>
                </div>
                <div className="required">
                    <label><p>Osoite</p></label>
                    <input onChange={handleAddressChange} className="formInput"/>
                </div>
                <div>
                    <label><p>Kommentti</p></label>
                    <textarea onChange={handleCommentChange} className="formInput" rows="5"/>
                </div>
                <input type="file" />
            <button type="submit" className="button center">Tallenna</button>
            </form>
        </div>
    )
}

export default AddNewForm