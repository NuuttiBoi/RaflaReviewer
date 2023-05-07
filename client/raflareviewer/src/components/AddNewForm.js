import { useState } from 'react'
import resService from '../services/restaurants'
import commentService from '../services/comments'
import Checkbox from './FormCheckbox'
import Icon from '../images/x'
import tagList from '../sources/tagList'
import scores from '../sources/scores'
import useData from "../hooks/useData";

/**
 * Lisää uusi arvostelu -lomake
 */

const AddNewForm = ({ update, isLoggedIn }) => {
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
    const [foodScore, setFoodScore] = useState(50)
    const [qualityPriceScore, setqualityPriceScore] = useState(50)
    const [experienceScore, setExperienceScore] = useState(50)
    const [image, setImage] = useState('')

    const user = useData() || {}

    let username = "Anonyymi"
    if (isLoggedIn) {
        username = user.username
    }

    console.log('user ', user)

    /**
     * Tarkistus, etteivät pakolliset kentät ole tyhjät
     */
    const checkFields = () => {
        const requiredFields = document.getElementById('addNewForm').querySelectorAll('.required > input')

        let ok = true;
        requiredFields.forEach(input => {
            if (input.value.trim().length === 0) {
                ok = false
            }
        })
        // Estä napin painaminen, jos joku pakollisista kentistä on tyhjä
        ok ? document.getElementById('formSubmitButton').classList.remove('unclickable') : document.getElementById('formSubmitButton').classList.add('unclickable')
    }

    /**
     * Piilottaa lomakkeen näkyvistä ja resetoi kentät
     */
    function closeForm() {
        console.log('close')
        document.getElementById('addNewForm').classList.add('visuallyhidden')
        document.querySelector('body').classList.remove('locked')
        setNewName("")
        setNewAddress("")
        setNewComment("")
        setImage("")
        setCafe(false)
        setFastFood(false)
        setLunch(false)
        setBrunch(false)
        setVegetarian(false)
        setAccessible(false)
        setTakeAway(false)
    }

    /**
     * Tietojen tallennus tietokantaan
     */
    const saveForm = (event) => {
        event.preventDefault()
        console.log('save')

        const tags = [
            {
                title: tagList.cafeTitle,
                value: cafe
            },
            {
                title: tagList.fastFoodTitle,
                value: fastFood
            },
            {
                title: tagList.lunchTitle,
                value: lunch
            },
            {
                title: tagList.brunchTitle,
                value: brunch
            },
            {
                title: tagList.vegetarianTitle,
                value: vegetarian
            },
            {
                title: tagList.accessibleTitle,
                value: accessible
            },
            {
                title: tagList.takeAwayTitle,
                value: takeAway
            }
        ]

        // Valitut tagit taulukkoon
        let tagsApply = []
        tags.map(tag => {
            if (tag.value) {
                tagsApply.push(tag.title)
            }
        })

        // Uusi ravintola-olio
        const newRestaurant = {
                name: newName,
                address: newAddress,
                tags: tagsApply,
                foodScore: foodScore,
                qualityPriceScore: qualityPriceScore,
                experienceScore: experienceScore,
                thumbsUp: [],
                thumbsDown: [],
                image: image,
                userId: user._id
            }

            console.log('saving ', newRestaurant)

            // Jos url-kenttää ei ole jätetty tyhjäksi, tarkistus onko url validi
            if (image.length === 0 || isValidUrl(image) ) {
                console.log('url ok')
                // Jos url ok, lähetys palvelimelle
                resService
                    .create(newRestaurant)
                    .then(response => {
                        console.log('success')

                        // Jos arvostelussa mukana kommentti, tallennetaan se toiseen tauluun
                        if (newComment.trim().length > 0) {
                            // Kommentti-olio
                            const Comment = {
                                restaurantId: response.id, // Ravintolan id = responsen palauttama id
                                username: username,
                                userId: user._id,
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
                update(newRestaurant)
            } else {
                // Jos url ei ole validissa muodossa, näytä virheilmoitus
                document.getElementById('addNewForm').querySelector('.warningText').style.opacity = '1'
            }
    }

    /**
     * Nimi-muuttujan päivitys nimikentän muuttuessa (pakollinen kenttä)
     */
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)

        // Tarkista muut pakolliset kentät
        checkFields()
    }

    /**
     * Osoite-muuttujan päivitys osoitekentän muuttuessa (pakollinen kenttä)
     */
    const handleAddressChange = (event) => {
        console.log(event.target.value)
        setNewAddress(event.target.value)

        // Tarkista muut pakolliset kentät
        checkFields()
    }

    /**
     * Url-muuttujan päivitys url-kentän muuttuessa
     */
    const handleImageChange = (event) => {
        console.log(event.target.value)
        setImage(event.target.value)
    }

    /**
     * Kommentin päivitys kommenttikentän muuttuessa
     */
    const handleCommentChange = (event) => {
        console.log(event.target.value)
        setNewComment(event.target.value)
    }

    /**
     * "Kahvila"-arvon vaihtaminen nappia painettaessa
     */
    const handleCafeChange = (event) => {
        setCafe(!cafe)
    }

    /**
     * "Pikaruoka"-arvon vaihtaminen nappia painettaessa
     */
    const handleFastFoodChange = (event) => {
        setFastFood(!fastFood)
    }

    /**
     * "Lounas"-arvon vaihtaminen nappia painettaessa
     */
    const handleLunchChange = (event) => {
        setLunch(!lunch)
    }

    /**
     * "Brunssi"-arvon vaihtaminen nappia painettaessa
     */
    const handleBrunchChange = (event) => {
        setBrunch(!brunch)
    }

    /**
     * "Kasvisvaihtoehtoja"-arvon vaihtaminen nappia painettaessa
     */
    const handleVegetarianChange = (event) => {
        setVegetarian(!vegetarian)
    }

    /**
     * "Liikuntaesteetön"-arvon vaihtaminen nappia painettaessa
     */
    const handleAccessibleChange = (event) => {
        setAccessible(!accessible)
    }

    /**
     * "Takeaway"-arvon vaihtaminen nappia painettaessa
     */
    const handleTakeAwayChange = (event) => {
        setTakeAway(!takeAway)
    }

    /**
     * Ruoka-arvosanan päivitys sliderin arvon muuttuessa
     */
    const handleFoodScoreChange = (event) => {
        console.log('food ', event.target.value)
        setFoodScore(event.target.value)
    }

    /**
     * Hinta-laatu-suhde -arvosanan päivitys sliderin arvon muuttuessa
     */
    const handlequalityPriceScoreChange = (event) => {
        console.log('quality price ', event.target.value)
        setqualityPriceScore(event.target.value)
    }

    /**
     * Kokemus-arvosanan päivitys sliderin arvon muuttuessa
     */
    const handleExperienceScoreChange = (event) => {
        console.log('experience ', event.target.value)
        setExperienceScore(event.target.value)
    }

    /**
     * Tarkistaa onko merkkijono validi url
     * @param {string} url - tarkistettava merkkijono
     * @return {boolean} - true, jos url on validi
     */
    const isValidUrl = url => {
        try { 
            return Boolean(new URL(url)); 
        }
        catch(e){ 
            return false; 
        }
    }

    return (
        <div id="addNewForm" className="visuallyhidden popup addNewForm">
            <header className="formHeader">
                <h2>Lisää arvostelu</h2>
                <button onClick={closeForm} className="closeButton">
                    <Icon />
                </button>
            </header>
            <form onSubmit={saveForm} action="/images/" method="POST" enctype="multipart/form-data">
                <div className="formFields">

                    <div className="required">
                        <label><p>Ravintolan nimi</p></label>
                        <input value={newName} onChange={handleNameChange} className="formInput"/>
                    </div>
                    <div className="required">
                        <label><p>Osoite</p></label>
                        <input value={newAddress} onChange={handleAddressChange} className="formInput"/>
                    </div>
        
                    <section>
                        <div className="sliderContainer">
                            <label>{scores.food.title}</label>
                            <div className="sliderWrapper">
                                <span className="sliderValue">0</span>
                                <input type="range" min="0" max="100" value={foodScore} className="slider" onChange={handleFoodScoreChange} />
                                <span className="sliderValue">{scores.food.max}</span>
                            </div>
                        </div>
                        <div className="sliderContainer">
                            <label>{scores.qualityPrice.title}</label>
                            <div className="sliderWrapper">
                                <span className="sliderValue">0</span>
                                <input type="range" min="0" max="100" value={qualityPriceScore} className="slider" onChange={handlequalityPriceScoreChange} />
                                <span className="sliderValue">{scores.qualityPrice.max}</span>
                            </div>                        </div>
                        <div className="sliderContainer">
                            <label>{scores.experience.title}</label>
                            <div className="sliderWrapper">
                                <span className="sliderValue">0</span>
                                <input type="range" min="0" max="100" value={experienceScore} className="slider" onChange={handleExperienceScoreChange} />
                                <span className="sliderValue">{scores.experience.max}</span>
                            </div>
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
                        <textarea value={newComment} onChange={handleCommentChange} className="formInput" rows="4"/>
                    </div>
                    <section>
                        <h2>Lisää kuva</h2>
                        <div>
                            <label><p>URL</p></label>
                            <input value={image} onChange={handleImageChange} className="formInput"/>
                        </div>
                        <p className='warningText'>Virheellinen URL</p>
                    </section>
                </div>
            <button type="submit" className="button center unclickable" id="formSubmitButton">Tallenna</button>
            </form>
        </div>
    )
}

export default AddNewForm