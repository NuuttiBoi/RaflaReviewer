import Filter from '../images/Filter'

const SearchBar = ({ onChange, filterResults }) => {
    return (
        <div className="searchBar center">
            <input placeholder="Etsi" onChange={onChange}/>
            <button className="filterButton" title="Suodata hakutuloksia" onClick={filterResults}><Filter /></button>
        </div>
    )
}

export default SearchBar