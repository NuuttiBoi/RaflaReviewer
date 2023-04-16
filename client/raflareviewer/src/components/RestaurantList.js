// Komponentti jossa lista ravintoloista

import Restaurant from './Restaurant'

const RestaurantList = ({ restaurants }) => {
    console.log(restaurants)
    const resList = restaurants.map(restaurant => {
        console.log('name ',restaurant.name)
      return (
        <li key={restaurant.name}>
          <Restaurant
            name={restaurant.name}
            address={restaurant.address}/>
        </li>
      )
    })

    console.log(restaurants.length)

    if (restaurants.length === 0) return null;
  
    return (
        <ul className="restaurantList">
            {resList}
        </ul>
    )
}

export default RestaurantList