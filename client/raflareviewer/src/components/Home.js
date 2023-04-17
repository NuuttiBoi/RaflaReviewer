import { useState, useEffect } from 'react'
import resService from '../services/restaurants'
import RestaurantList from './RestaurantList'
import AddNewForm from './AddNewForm'
import SearchBar from './SearchBar'

function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    resService
      .getAll()
      .then(response => {
          console.log(response.restaurants)
          setRestaurants(response.restaurants)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])

    const openForm = (event) => {
      event.preventDefault() 
      document.getElementById('addNewForm').classList.remove('visuallyhidden')
      document.getElementById('addNewForm').classList.add('addNewForm')
      console.log('open form')
    }

    // Hakukentän event handler
    const handleFilter = (event) => {
      setSearchWord(event.target.value)
    }

    console.log("searching ", searchWord)
    const restaurantsToShow = restaurants.filter(findWord)

    // Etsii sanaa kaikista ravintola-olion kentistä (pitää päivittää jos lisätään kenttiä)
    function findWord(res) {
      if (res.name.toLowerCase().includes(searchWord.toLowerCase()) ||
      res.address.toLowerCase().includes(searchWord.toLowerCase()) ||
      res.comment.toLowerCase().includes(searchWord.toLowerCase())) {
        return true;
      }
    }

    return (
    <div className="container">
        <SearchBar onChange={handleFilter}/>
        <button onClick={openForm} className="button center">Lisää uusi</button>
        <RestaurantList restaurants={restaurantsToShow}/>
        <AddNewForm />
    </div>
  );
}

export default Home
