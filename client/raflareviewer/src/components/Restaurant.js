import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ThumbsUpButtons from './ThumbsUpButtons'
import Address from './Address'
import commentService from '../services/comments'
import restaurantService from '../services/restaurants'
import scores from '../sources/scores'
import Scores from './Scores'
import useData from '../hooks/useData'

const Restaurant = ({ restaurant, isLoggedIn }) => {
    const [comments, setComments] = useState([])
    const [thumbsUp, setThumbsUp] = useState([])
    const [thumbsDown, setThumbsDown] = useState([])

    const [thumbs, setThumbs] = useState({
      thumbsUp: [],
      thumbsDown: []
    })
  
    const user = useData() || {}
    console.log('user: ', user)

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

    useEffect(() => {
      setThumbsUp(restaurant.thumbsUp)
      setThumbsDown(restaurant.thumbsDown)
    })

    const upId = `thumbsUp${restaurant.id}`
    const downId = `thumbsDown${restaurant.id}`

    if (restaurant.thumbsUp.includes(user._id)) document.getElementById(upId).classList.add('clicked')
    if (restaurant.thumbsDown.includes(user._id)) document.getElementById(downId).classList.add('clicked')
    
    console.log('liked: ', restaurant.thumbsUp)
    console.log('disliked: ', restaurant.thumbsDown)


  const handleThumbsUpClick = () => {
    if (isLoggedIn) {
        console.log('thumbs up')

        if (!document.getElementById(upId).classList.contains('clicked')) {
          
          document.getElementById(upId).classList.add('clicked')
          
        } else {
          // Poista tykkäys

          document.getElementById(upId).classList.remove('clicked')

        }
    } else {
        console.log('log in')
        // alert
    }
  }

  const handleThumbsDownClick = () => {
      if (isLoggedIn) {
          console.log('thumbs down')

          if (!restaurant.thumbsDown.includes(user.id)) {
            
          }
      } else {
          console.log('log in')
          // alert
      }
  }

  

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
    
    return (
      <article className="restaurantArticle">
        <h2>{restaurant.name}</h2>
        <div className="article-img">
          <img src="https://placekitten.com/800/800" />
        </div>
        <div>
          <Address address={restaurant.address} />
          <Scores scores={scoreInfo} />
        </div>
        <NavLink
          to={{ pathname: './RestaurantPage' }}
          state={{ restaurant: restaurant,
                  scoreInfo: scoreInfo,
                  upId: upId,
                  downId: downId
                }}
          className="button articleButton center">
            <span>Katso arvostelut</span> <span>{`(${comments.length})`}</span>
        </NavLink>
        <ThumbsUpButtons upId={upId} downId={downId} up={thumbsUp.length} down={thumbsDown.length} handleUp={handleThumbsUpClick} handleDown={handleThumbsDownClick} />
      </article>
    )
  }

export default Restaurant