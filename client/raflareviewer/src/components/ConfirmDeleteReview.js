import Icon from '../images/x'

// "Vahvista että haluat poistaa arvostelun" -popup

const ConfirmDeleteReview = ({ onClick }) => {

    function closePopup() {
        document.getElementById('confirmDeletePopup').classList.add('visuallyhidden')
        document.querySelector('body').classList.remove('locked')
    }

    return (
        <div id="confirmDeletePopup" className="visuallyhidden popup">
            <header className="formHeader">
                <button onClick={closePopup} className="closeButton">
                    <Icon />
                </button>
            </header>
            <p className="center">Arvostelun poistaminen poistaa myös kaikki kommentit. Haluatko varmasti poistaa arvostelun?</p>
            
            <button className="button center" onClick={onClick}>Poista</button>
        </div>
    )
}

export default ConfirmDeleteReview