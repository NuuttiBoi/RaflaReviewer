import Filter from '../images/Filter'

/**
 * Komponentti, jolla renderöidään hakupalkki ja suodatin-nappi.
 * @param onChange - Funktio, joka suoritetaan kun hakupalkkiin kirjoitetaan.
 * @param filterResults - Funktio, joka suoritetaan kun suodatin-nappia painetaan.
 * @returns {JSX.Element}
 * @constructor
 */
const SearchBar = ({ onChange, filterResults }) => {
    return (
        <div className="searchBar center">
            <input placeholder="Etsi" onChange={onChange}/>
            <button className="filterButton" title="Suodata hakutuloksia" onClick={filterResults}><Filter /></button>
        </div>
    )
}

export default SearchBar