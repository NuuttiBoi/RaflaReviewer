import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ThumbsUpButtons from './ThumbsUpButtons'
import Address from './Address'
import commentService from '../services/comments'

const Restaurant = ({ restaurant }) => {
  const [comments, setComments] = useState([])

    useEffect(() => {
        commentService
          .getByRestaurant(restaurant.id)
          .then(response => {
              setComments(response)
          })
          .catch(error => {
            console.log(error)
          })
    }, [])

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
            <span>Katso arvostelut</span> <span>{`(${comments.length})`}</span>
        </NavLink>
        <ThumbsUpButtons />
      </article>
    )
  }

export default Restaurant