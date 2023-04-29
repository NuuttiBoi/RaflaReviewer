// Komponentti jossa lista ravintoloista

import Restaurant from './Restaurant'

const RestaurantList = ({ restaurants }) => {
  if (restaurants === null) return <p className="no-results">Ladataan...</p>

  if (restaurants.length === 0) return <p className="no-results">Haulla ei löytynyt tuloksia</p>

  const resList = restaurants.map(restaurant => {
    return (
      <li key={restaurant.name}>
        <Restaurant restaurant={restaurant}/>
      </li>
    )
  })

  return (
      <ul className="restaurantList">
          {resList}
      </ul>
  )
}

export default RestaurantList