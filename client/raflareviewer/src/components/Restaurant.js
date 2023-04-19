import { NavLink } from 'react-router-dom'
import ThumbsUpButtons from './ThumbsUpButtons'
import Icon from '../images/Pin.js'

function showReviews(event) {
  event.preventDefault()
  console.log('katso arvostelut ', )
}

const Restaurant = ({ name, address, comment }) => {
    return (
      <article className="restaurantArticle">
        <h2>{name}</h2>
        <div className="restaurantArticle__address">
          <Icon />
          <p>{address}</p>
        </div>
        <p>{comment}</p>
        <NavLink to="./RestaurantPage" className="button articleButton center"><span>Katso arvostelut</span> <span>(0)</span></NavLink>
        <ThumbsUpButtons />
      </article>
    )
  }  

export default Restaurant