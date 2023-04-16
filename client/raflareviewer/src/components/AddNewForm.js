import { useState } from 'react'

const AddNewForm = () => {
    const [className, setClassName] = useState('addNewForm')

    // Piilottaa lomakkeen näkyvistä
    function closeForm() {
        console.log('close')
        document.getElementById('addNewForm').classList.add('visuallyhidden')
        document.getElementById('addNewForm').classList.remove('addNewForm')
    }

    // Tallentaa tiedot ja piilottaa lomakkeen
    function saveForm() {
        console.log('save')
        // tallenna tiedot (ei toimi vielä)
        closeForm()
    }

    return (
        <div id="addNewForm" className="visuallyhidden">
            <header className="formHeader">
                <h2>Lisää ravintola</h2>
                <button onClick={closeForm} className="closeButton">x</button>
            </header>
            <form>
                <div>
                    <label>Nimi</label>
                    <input className="formInput"/>
                </div>
                <div>
                    <label>Osoite</label>
                    <input className="formInput"/>
                </div>
                <div>
                    <label>Kommentti</label>
                    <textarea className="formInput" rows="5"/>
                </div>
                <input type="file" />
                yms
            </form>
            <button onClick={saveForm} className="button center">Tallenna</button>
        </div>
    )
}

export default AddNewForm