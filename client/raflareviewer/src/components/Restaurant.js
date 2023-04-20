import { NavLink } from 'react-router-dom'
import ThumbsUpButtons from './ThumbsUpButtons'
import Address from './Address'

const Restaurant = ({ restaurant }) => {
    return (
      <article className="restaurantArticle">
        <h2>{restaurant.name}</h2>
        <div className="article-img">
          <img src="https://placekitten.com/800/800" />
        </div>
        <Address address={restaurant.address} />
        <NavLink
          to={{ pathname: './RestaurantPage' }}
          state={{ restaurant: restaurant }}
          className="button articleButton center">
            <span>Katso arvostelut</span> <span>(0)</span>
        </NavLink>
        <ThumbsUpButtons />
      </article>
    )
  }

export default Restaurant