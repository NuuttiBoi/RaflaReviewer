import { NavLink } from 'react-router-dom'
import ThumbsUpButtons from './ThumbsUpButtons'

function showReviews(event) {
  event.preventDefault()
  console.log('katso arvostelut ', )
}

const Restaurant = ({ name, address, comment }) => {
    return (
      <article className="restaurantArticle">
        <h2>{name}</h2>
        <p>📍 {address}</p>
        <p>{comment}</p>
        <NavLink to="./RestaurantPage" className="button articleButton center">Katso arvostelut</NavLink>
        <ThumbsUpButtons />
      </article>
    )
  }  

export default Restaurant