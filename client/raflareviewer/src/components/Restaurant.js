import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ThumbsUpButtons from './ThumbsUpButtons'
import Address from './Address'
import commentService from '../services/comments'
import scores from '../sources/scores'
import Scores from './Scores'

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

    // Komponentti joka luo arvosanaboksit saa listan parametriksi
    const scoreInfo = [
      {
        title: scores.food.title,
        value: restaurant.foodScore,
        max: scores.food.max
      },
      {
        title: scores.qualityPrice.title,
        value: restaurant.qualityPriceScore,
        max: scores.qualityPrice.max
      },
      {
        title: scores.experience.title,
        value: restaurant.experienceScore,
        max: scores.experience.max
      }
    ]

    console.log('info: ', scoreInfo)

    return (
      <article className="restaurantArticle">
        <h2>{restaurant.name}</h2>
        <div className="article-img">
          <img src="https://placekitten.com/800/800" />
        </div>
        <Address address={restaurant.address} />
        <Scores scores={scoreInfo} />
        <NavLink
          to={{ pathname: './RestaurantPage' }}
          state={{ restaurant: restaurant,
                  scoreInfo: scoreInfo }}
          className="button articleButton center">
            <span>Katso arvostelut</span> <span>{`(${comments.length})`}</span>
        </NavLink>
        <ThumbsUpButtons />
      </article>
    )
  }

export default Restaurant