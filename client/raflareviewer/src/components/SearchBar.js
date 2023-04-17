const SearchBar = ({ onChange }) => {
    return (
        <div className="searchBar center">
            <input placeholder="Etsi" onChange={onChange}/>
        </div>
    )
}

export default SearchBar