import Icon from '../images/x'

const Confirm = ({ id, onClick, update }) => {

    function closePopup() {
        document.getElementById(id).classList.add('visuallyhidden')
        document.querySelector('body').classList.remove('locked')
    }

    return (
        <div id={id} className="visuallyhidden popup">
            <header className="formHeader">
                <button onClick={closePopup} className="closeButton">
                    <Icon />
                </button>
            </header>
            <p className="center">Haluatko varmasti poistaa kommentin?</p>
            
            <button className="button center" onClick={onClick}>Poista</button>
        </div>
    )
}

export default Confirm