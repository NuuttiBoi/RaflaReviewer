import { useState, useEffect } from 'react'
import resService from '../services/restaurants'
import RestaurantList from './RestaurantList'
import AddNewForm from './AddNewForm'
import SearchBar from './SearchBar'
import Tags from './Tags'

function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    resService
      .getAll()
      .then(response => {
          console.log(response)
          setRestaurants(response)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])

    const openForm = (event) => {
      event.preventDefault() 
      document.getElementById('addNewForm').classList.remove('visuallyhidden')
      document.querySelector('body').classList.add('locked')
      console.log('open form')
    }

    // Hakukentän event handler
    const handleFilter = (event) => {
      setSearchWord(event.target.value)
    }

    console.log("searching ", searchWord)
    const restaurantsToShow = restaurants.filter(findWord)

    // Etsii sanaa ravintolan nimestä- ja osoitteesta
    function findWord(res) {
      if (res.name.toLowerCase().includes(searchWord.toLowerCase()) ||
      res.address.toLowerCase().includes(searchWord.toLowerCase())) {
        return true;
      }
    }

    return (
    <div className="container">
        <SearchBar onChange={handleFilter}/>
        <button onClick={openForm} className="button center">Lisää arvostelu</button>
        <Tags />
        <RestaurantList restaurants={restaurantsToShow}/>
        <AddNewForm />
    </div>
  );
}

export default Home
