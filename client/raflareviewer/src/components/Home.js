import { useState, useEffect } from 'react'
import resService from '../services/restaurants'
import RestaurantList from './RestaurantList'
import AddNewForm from './AddNewForm'
import SearchBar from './SearchBar'
import Tags from './Tags'
import tagList from '../sources/tagList'
import ResultsAmount from './ResultsAmount'

function Home({isLoggedIn}) {
  const [restaurants, setRestaurants] = useState([])
  const [searchWord, setSearchWord] = useState('')

  const [filters, setFilters] = useState({
    Kahvila: false,
    Pikaruoka: false,
    Lounas: false,
    Brunssi: false,
    Kasvisvaihtoehtoja: false,
    Liikuntaesteetön: false,
    Takeaway: false
  })

  console.log('filters ',filters)

  let showFilters = []
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      showFilters.push(key)
    }
  })

  console.log('keys ', showFilters)

  let filteredRestaurants = restaurants
  if (showFilters.length > 0) {
    filteredRestaurants = restaurants.filter(findCategory)
  }

  function findCategory(res) {
    showFilters.forEach(filter => {
      if (!res.tags.includes(filter)) {
        return false
      }
    })
    return true
  }

  const handleCafeChange = () => {
      document.getElementById(tagList.cafeTitle).classList.toggle('checked')
      const newFilters = {
        ...filters,
        "Kahvila": !filters.Kahvila
      }
      setFilters(newFilters)
  }

  const handleFastFoodChange = () => {
    document.getElementById(tagList.fastFoodTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Pikaruoka": !filters.Pikaruoka
    }
    setFilters(newFilters)
  }

  const handleLunchChange = () => {
    document.getElementById(tagList.lunchTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Lounas": !filters.Lounas
    }
    setFilters(newFilters)
  }

  const handleBrunchChange = () => {
    document.getElementById(tagList.brunchTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Brunssi": !filters.Brunssi
    }
    setFilters(newFilters)
  }

  const handleVegetarianChange = () => {
    document.getElementById(tagList.vegetarianTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Kasvisvaihtoehtoja": !filters.Kasvisvaihtoehtoja
    }
    setFilters(newFilters)
  }

  const handleAccessibleChange = () => {
    document.getElementById(tagList.accessibleTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Liikuntaesteetön": !filters.Liikuntaesteetön
    }
    setFilters(newFilters)
  }

  const handleTakeAwayChange = () => {
    document.getElementById(tagList.takeAwayTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Takeaway": !filters.Takeaway
    }
    setFilters(newFilters)
  }

  useEffect(() => {
    resService
      .getAll()
      .then(response => {
          //console.log(response)
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
    //const restaurantsToShow = restaurants.filter(findWord)
    let restaurantsToShow = filteredRestaurants.filter(findWord)

    // Etsii sanaa ravintolan nimestä- ja osoitteesta
    function findWord(res) {
      if (res.name.toLowerCase().includes(searchWord.toLowerCase()) ||
      res.address.toLowerCase().includes(searchWord.toLowerCase())) {
        return true;
      }
    }

    // Suodatinpainikkeen painaminen näyttää/piilottaa tagit
    const filterResults = () => {
      document.getElementById('tagContainer').classList.toggle('visuallyhidden')
    }

    let filterWords = showFilters
    if (searchWord != '') {
      filterWords = showFilters.concat(searchWord)
    }

    const updatePage = (newRestaurant) => {
      console.log(newRestaurant)
      setRestaurants(restaurants.concat(newRestaurant))
    }

    if (restaurants.length === 0) {
      console.log('null')
      //restaurantsToShow = null
    }

    const restaurantData = (restaurants.length === 0) ? null : restaurantsToShow

    return (
      <div className="container">
        <h1>Ravintolahaku</h1>
          <button onClick={openForm} className="button center">Lisää arvostelu</button>
          <SearchBar onChange={handleFilter} filterResults={filterResults}/>
          <Tags
            cafeLabel={tagList.cafeTitle} onCafeChange={handleCafeChange}
            fastFoodLabel={tagList.fastFoodTitle} onFastFoodChange={handleFastFoodChange}
            lunchLabel={tagList.lunchTitle} onLunchChange={handleLunchChange}
            brunchLabel={tagList.brunchTitle} onBrunchChange={handleBrunchChange}
            vegetarianLabel={tagList.vegetarianTitle} onVegetarianChange={handleVegetarianChange}
            accessibleLabel={tagList.accessibleTitle} onAccessibleChange={handleAccessibleChange}
            takeAwayLabel={tagList.takeAwayTitle} onTakeAwayChange={handleTakeAwayChange}
          />
          <ResultsAmount number={restaurantsToShow.length} filterWords={filterWords} />
          <RestaurantList restaurants={restaurantData}/>
          <AddNewForm update={updatePage} isLoggedIn={isLoggedIn}/>
      </div>
  );
}

export default Home
