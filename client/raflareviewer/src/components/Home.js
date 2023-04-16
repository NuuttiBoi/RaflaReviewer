import { useState, useEffect } from 'react'
import axios from 'axios'
import RestaurantList from './RestaurantList'
import AddNewForm from './AddNewForm'

const baseUrl = 'http://localhost:3001/restaurants'

function Home() {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    console.log('effect')

    axios
      .get(baseUrl)
      .then(response => {
          console.log(response.data.restaurants)
          setRestaurants(response.data.restaurants)
      })
      .catch(error => {
        console.log('error')
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
