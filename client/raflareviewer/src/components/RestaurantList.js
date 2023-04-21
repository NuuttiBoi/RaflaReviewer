// Komponentti jossa lista ravintoloista

import Restaurant from './Restaurant'

const RestaurantList = ({ restaurants }) => {
    console.log(restaurants)
    const resList = restaurants.map(restaurant => {
        console.log('name ',restaurant.name)
      return (
        <li key={restaurant.name}>
          <Restaurant restaurant={restaurant}/>
        </li>
      )
    })

    console.log(restaurants.length)

    if (restaurants.length === 0) return <p className="no-results">Haulla ei löytynyt tuloksia</p>
  
    return (
        <ul className="restaurantList">
            {resList}
        </ul>
    )
}

export default RestaurantList