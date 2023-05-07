/**
 * Ravintola-artikkelit sisältävä komponentti
 */

import Restaurant from './Restaurant'

const RestaurantList = ({ restaurants, isLoggedIn }) => {
  /**
   * Sivulla näytettävä teksti, jos ravintoloita ladataan tai ei pystytty hakemaan tietokannasta
   */
  if (restaurants === null) return <p className="no-results">Ladataan...</p>

  /**
   * Sivulla näytettävä teksti, jos haulla ei löytynyt yhtään ravintolaa
   */
  if (restaurants.length === 0) return <p className="no-results">Haulla ei löytynyt tuloksia</p>

  const resList = restaurants.map(restaurant => {
    return (
      <li key={restaurant.name}>
        <Restaurant restaurant={restaurant} isLoggedIn={isLoggedIn} />
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