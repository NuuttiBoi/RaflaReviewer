import ReportIcon from '../images/ReportIcon.js'

/**
 * Komponentti, joka sisältää info-kuvakkeen ja painikkeen, josta käyttäjä voi lähettää
 * palautetta virheellisestä sisällöstä
 */

const Report = ({onClick}) => {
    return (
        <div className="reportBtnContainer">
            <button className="reportBtn" onClick={onClick}><ReportIcon /><span className='small'>Ilmoita virheellisistä tiedoista</span></button>
        </div>
    )
}

export default Report