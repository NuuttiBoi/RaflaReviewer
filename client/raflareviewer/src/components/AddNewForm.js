// Lisää uusi arvostelu -lomake

import { useState } from 'react'
import resService from '../services/restaurants'
import Icon from '../images/x'

const AddNewForm = () => {
    // Kenttien tiedot
    const [newName, setNewName] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newComment, setNewComment] = useState('')


    // Piilottaa lomakkeen näkyvistä
    function closeForm() {
        console.log('close')
        document.getElementById('addNewForm').classList.add('visuallyhidden')
        document.getElementById('addNewForm').classList.remove('addNewForm')
    }

    // Tallentaa tiedot ja piilottaa lomakkeen
    const saveForm = (event) => {
        event.preventDefault()
        console.log('save')
        // tallenna tiedot (ei toimi vielä)

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
        <div id="addNewForm" className="visuallyhidden">
            <header className="formHeader">
                <h2>Lisää ravintola</h2>
                <button onClick={closeForm} className="closeButton">
                    <Icon />
                </button>
            </header>
            <form onSubmit={saveForm}>
                <div>
                    <label>Nimi</label>
                    <input onChange={handleNameChange} className="formInput"/>
                </div>
                <div>
                    <label>Osoite</label>
                    <input onChange={handleAddressChange} className="formInput"/>
                </div>
                <div>
                    <label>Kommentti</label>
                    <textarea onChange={handleCommentChange} className="formInput" rows="5"/>
                </div>
                <input type="file" />
            <button type="submit" className="button center">Tallenna</button>
            </form>
        </div>
    )
}

export default AddNewForm