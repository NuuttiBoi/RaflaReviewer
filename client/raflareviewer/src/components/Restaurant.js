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
    console.log('restaurant user: ', user)

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

    // Thumbs up/down asetus
    useEffect(() => {
      setThumbsUp(restaurant.thumbsUp)
      setThumbsDown(restaurant.thumbsDown)
    }, [])

    const upId = `thumbsUp${restaurant.id}`
    const downId = `thumbsDown${restaurant.id}`

  const handleThumbsUpClick = () => {
    if (isLoggedIn) {
        console.log('thumbs up')

        if (!restaurant.thumbsUp.includes(user._id)) {
          //add button class clicked green
          // remove thumbs down
          document.getElementById(upId).classList.add('clicked')
          document.getElementById(downId).classList.remove('clicked')
          //add to db

          restaurantService
            .update(restaurant.id, {})
            .then(response => {
              console.log('? ', response)
          })
          .catch(error => {
            console.log(error)
          })
        }
    } else {
        console.log('log in')
        // alert
    }
  }

  const handleThumbsDownClick = () => {
      if (isLoggedIn) {
          console.log('thumbs down')
          console.log('gave thumbs down:', restaurant.thumbsDown)

          if (!restaurant.thumbsDown.includes(user.id)) {
            //add button class clicked red
            // remove thumbs up
            document.getElementById(downId).classList.add('clicked')
            document.getElementById(upId).classList.remove('clicked')
          }
      } else {
          console.log('log in')
          // alert
      }
  }

  useEffect(() => {
    if (document.getElementById(upId).classList.contains('clicked')) {
      console.log('cliekd!!!')
    }
  })

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
                  scoreInfo: scoreInfo }}
          className="button articleButton center">
            <span>Katso arvostelut</span> <span>{`(${comments.length})`}</span>
        </NavLink>
        <ThumbsUpButtons upId={upId} downId={downId} up={thumbsUp.length} down={thumbsDown.length} handleUp={handleThumbsUpClick} handleDown={handleThumbsDownClick} />
      </article>
    )
  }

export default Restaurant