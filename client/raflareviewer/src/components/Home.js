import { useState, useEffect } from 'react'
import resService from '../services/restaurants'
import RestaurantList from './RestaurantList'
import AddNewForm from './AddNewForm'
import SearchBar from './SearchBar'
import Tags from './Tags'
import tagList from '../sources/tagList'
import ResultsAmount from './ResultsAmount'
import LoginPrompt from './LoginPrompt'
import useData from '../hooks/useData'

function Home({isLoggedIn}) {

  const user = useData() || {}

  console.log('user ', user)
  console.log('user obj ', Object.keys(user).length)

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

  /**
   * Luo listan valituista suodattimista
   */
  let showFilters = []
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      showFilters.push(key)
    }
  })

  console.log('keys ', showFilters)

  let filteredRestaurants = restaurants

  /**
   * Jos suodattimia on valittu vähintään yksi, luodaan lista ravintoloista, joista
   * kategoriat löytyvät. Jos suodattimia on valittu 0, näytetään kaikki ravintolat.
   */
  if (showFilters.length > 0) {
    filteredRestaurants = restaurants.filter(findCategory)
  }

  /**
   * Käy läpi ravintolaan tallennetut kategoriat ja vertaa niitä
   * listaan valituista suodattimista
   * @returns {boolean} true - jos ravintola vastaa hakuehtoja
   */
  function findCategory(res) {
    let match = true
    
    showFilters.forEach(filter => {
      if (!res.tags.includes(filter)) {
        match = false
      }
    })
    return match
  }

  /**
   * Lisää/poistaa kahvilan valittujen suodattimien listalta nappia painettaessa
   */
  const handleCafeChange = () => {
      document.getElementById(tagList.cafeTitle).classList.toggle('checked')
      const newFilters = {
        ...filters,
        "Kahvila": !filters.Kahvila
      }
      setFilters(newFilters)
  }

  /**
   * Lisää/poistaa pikaruoan valittujen suodattimien listalta nappia painettaessa
   */
  const handleFastFoodChange = () => {
    document.getElementById(tagList.fastFoodTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Pikaruoka": !filters.Pikaruoka
    }
    setFilters(newFilters)
  }

  /**
   * Lisää/poistaa lounaan valittujen suodattimien listalta nappia painettaessa
   */
  const handleLunchChange = () => {
    document.getElementById(tagList.lunchTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Lounas": !filters.Lounas
    }
    setFilters(newFilters)
  }

  /**
   * Lisää/poistaa brunssin valittujen suodattimien listalta nappia painettaessa
   */
  const handleBrunchChange = () => {
    document.getElementById(tagList.brunchTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Brunssi": !filters.Brunssi
    }
    setFilters(newFilters)
  }

  /**
   * Lisää/poistaa kasvisvaihtoehdot valittujen suodattimien listalta nappia painettaessa
   */
  const handleVegetarianChange = () => {
    document.getElementById(tagList.vegetarianTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Kasvisvaihtoehtoja": !filters.Kasvisvaihtoehtoja
    }
    setFilters(newFilters)
  }

  /**
   * Lisää/poistaa liikuntaesteettömyyden valittujen suodattimien listalta nappia painettaessa
   */
  const handleAccessibleChange = () => {
    document.getElementById(tagList.accessibleTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Liikuntaesteetön": !filters.Liikuntaesteetön
    }
    setFilters(newFilters)
  }

  /**
   * Lisää/poistaa takeawayn valittujen suodattimien listalta nappia painettaessa
   */
  const handleTakeAwayChange = () => {
    document.getElementById(tagList.takeAwayTitle).classList.toggle('checked')
    const newFilters = {
      ...filters,
      "Takeaway": !filters.Takeaway
    }
    setFilters(newFilters)
  }

  /**
   * Ravintoloiden alustus
   */
  useEffect(() => {
    resService
      .getAll()
      .then(response => {
          setRestaurants(response)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])

    /**
     * Jos käyttäjä on kirjautunut sisään, uuden arvostelun lisäyslomake avataan.
     * Jos ei, näytetään popup, jossa kehotetaan kirjautumaan sisään.
     */
    const openForm = (event) => {
      event.preventDefault() 

      if (isLoggedIn && Object.keys(user).length != 0) {
        document.getElementById('addNewForm').classList.remove('visuallyhidden')
        document.querySelector('body').classList.add('locked')
        console.log('open form')
      } else {
        document.getElementById('loginPrompt').classList.remove('visuallyhidden')
        document.querySelector('body').classList.add('locked')
      }
    }

    /**
     * Päivittää hakusanan hakukentän muuttuessa
     */
    const handleFilter = (event) => {
      setSearchWord(event.target.value)
    }

    console.log("searching ", searchWord)

    /**
     * Päivittää sivulle ravintolat, jotka löytyvät hakusanalla
     */
    let restaurantsToShow = filteredRestaurants.filter(findWord)

    /**
     * Etsii hakusanaa ravintolan nimestä ja osoitteesta
     */
    function findWord(res) {
      if (res.name.toLowerCase().includes(searchWord.toLowerCase()) ||
      res.address.toLowerCase().includes(searchWord.toLowerCase())) {
        return true;
      }
    }

    /**
     * Suodatinpainikkeen painaminen näyttää/piilottaa kategoriat
     */
    const filterResults = () => {
      document.getElementById('tagContainer').classList.toggle('visuallyhidden')
    }

    let filterWords = showFilters

    /**
     * Jos hakusana on tyhjä, näytetään kaikki ravintolat
     */
    if (searchWord != '') {
      filterWords = showFilters.concat(searchWord)
    }

    /**
     * Päivittää sivulle uuden lisätyn ravintolan
     */
    const updatePage = (newRestaurant) => {
      console.log(newRestaurant)
      setRestaurants(restaurants.concat(newRestaurant))
    }

    /**
     * Ravintolat listaavalle elementille välitettävä tieto siitä,
     * onko tietokantaan tallennettu ollenkaan ravintoloita
     */
    const restaurantData = (restaurants.length === 0) ? null : restaurantsToShow

    return (
      <div className="container">
        <h1>Ravintolahaku</h1>
        <button id="addReviewMobile" onClick={openForm} className="button mobileOnly">+</button>
        <div className="searchContainer">
            <button id="addReview" onClick={openForm} className="button center hideOnMobile">Lisää arvostelu</button>
            <SearchBar onChange={handleFilter} filterResults={filterResults}/>
          </div>
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
          <RestaurantList restaurants={restaurantData} isLoggedIn={isLoggedIn}/>
          <AddNewForm update={updatePage} isLoggedIn={isLoggedIn}/>
          <LoginPrompt />
      </div>
  );
}

export default Home
