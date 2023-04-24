// Lisää uusi arvostelu -lomake

import { useState } from 'react'
import resService from '../services/restaurants'
import commentService from '../services/comments'
import Checkbox from './FormCheckbox'
import Icon from '../images/x'

const AddNewForm = () => {
    // Kenttien tiedot
    const [newName, setNewName] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newComment, setNewComment] = useState('')
    const [cafe, setCafe] = useState(false)
    const [fastFood, setFastFood] = useState(false)
    const [lunch, setLunch] = useState(false)
    const [brunch, setBrunch] = useState(false)
    const [vegetarian, setVegetarian] = useState(false)
    const [accessible, setAccessible] = useState(false)
    const [takeAway, setTakeAway] = useState(false)

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
                cafe: cafe,
                fastFood: fastFood,
                lunch: lunch,
                brunch: brunch,
                vegetarian: vegetarian,
                accessible: accessible,
                takeAway: takeAway
            }

            console.log('saving ', newRestaurant)

            ///

            // Lähetys palvelimelle
            resService
                .create(newRestaurant)
                .then(response => {
                    console.log('success')

                    // Jos arvostelussa mukana kommentti, tallennetaan se toiseen tauluun
                    if (newComment.trim().length > 0) {
                        // Kommentti-olio
                        const Comment = {
                            restaurantId: response.id, // Ravintolan id = responsen palauttama id
                            userId: "Anonyymi", // käyttäjä
                            content: newComment
                        }
                        console.log('comment ', Comment)

                        // Kommentin tallennus palvelimelle
                        commentService.create(Comment)
                            .then(response => {
                                console.log('comment saved ', response)
                            })
                            .catch(error => {
                                console.log('comment error ', error)
                            })
                    }
                })
                .catch(error => {
                    console.log(error)
            })
            console.log('saving ', newRestaurant)
            closeForm()


            ///
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

    const handleCafeChange = (event) => {
        setCafe(!cafe)
    }

    const handleFastFoodChange = (event) => {
        setFastFood(!fastFood)
    }

    const handleLunchChange = (event) => {
        setLunch(!lunch)
    }

    const handleBrunchChange = (event) => {
        setBrunch(!brunch)
    }

    const handleVegetarianChange = (event) => {
        setVegetarian(!vegetarian)
    }

    const handleAccessibleChange = (event) => {
        setAccessible(!accessible)
    }

    const handleTakeAwayChange = (event) => {
        setTakeAway(!takeAway)
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
                <div className="formFields">

                    <div className="required">
                        <label><p>Ravintolan nimi</p></label>
                        <input onChange={handleNameChange} className="formInput"/>
                    </div>
                    <div className="required">
                        <label><p>Osoite</p></label>
                        <input onChange={handleAddressChange} className="formInput"/>
                    </div>
                    
                    <section>
                        <div className="sliderContainer">
                            <label>Ruoka</label>
                            <input type="range" min="1" max="5" value="2.5" className="slider" onChange={() => {}} />
                        </div>
                        <div className="sliderContainer">
                            <label>Hinta-laatu-suhde</label>
                            <input type="range" min="1" max="5" value="2.5" className="slider" onChange={() => {}} />
                        </div>
                        <div className="sliderContainer">
                            <label>Kokemus</label>
                            <input type="range" min="1" max="5" value="2.5" className="slider" onChange={() => {}} />
                        </div>
                    </section>

                    <section>
                    <div className="formCheckboxContainer">
                        <Checkbox label="Kahvila" onChange={handleCafeChange} checked={cafe} />
                        <Checkbox label="Pikaruoka" onChange={handleFastFoodChange} checked={fastFood} />
                        <Checkbox label="Lounas" onChange={handleLunchChange} checked={lunch} />
                        <Checkbox label="Brunssi" onChange={handleBrunchChange} checked={brunch} />
                        <Checkbox label="Kasvisvaihtoehtoja" onChange={handleVegetarianChange} checked={vegetarian} />
                        <Checkbox label="Liikuntaesteetön" onChange={handleAccessibleChange} checked={accessible} />
                        <Checkbox label="Take away" onChange={handleTakeAwayChange} checked={takeAway} />
                    </div>
                    </section>

                    <div>
                        <label><p>Kommentti</p></label>
                        <textarea onChange={handleCommentChange} className="formInput" rows="4"/>
                    </div>
                    <section>
                        <input type="file" />
                    </section>
                </div>
            <button type="submit" className="button center">Tallenna</button>
            </form>
        </div>
    )
}

export default AddNewForm