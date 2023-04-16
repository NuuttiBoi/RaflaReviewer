import { useState, useEffect } from 'react'
import resService from '../services/restaurants'
import RestaurantList from './RestaurantList'
import AddNewForm from './AddNewForm'

function Home() {
  const [restaurants, setRestaurants] = useState([])

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

    return (
    <div className="container">
        <button onClick={openForm} className="button center">Lisää uusi</button>
        <RestaurantList restaurants={restaurants}/>
        <AddNewForm />
    </div>
  );
}

export default Home
