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
    /* const [thumbsUp, setThumbsUp] = useState([])
    const [thumbsDown, setThumbsDown] = useState([]) */

    // Tykänneiden käyttäjien id:t tallennettu taulukoihin
    const [thumbs, setThumbs] = useState({
      thumbsUp: [],
      thumbsDown: []
    })
  
    const user = useData() || {}
    //console.log('user: ', user)

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

    // Tykkäysten alustus
    useEffect(() => {
      setThumbs({
        thumbsUp: restaurant.thumbsUp,
        thumbsDown: restaurant.thumbsDown
      })
      if (restaurant.thumbsUp.includes(user._id)) document.getElementById(upId).classList.add('clicked')
    }, [])

    const upId = `thumbsUp${restaurant.id}`
    const downId = `thumbsDown${restaurant.id}`

    // if (restaurant.thumbsDown.includes(user._id)) document.getElementById(downId).classList.add('clicked')
    
    console.log('likes: ', thumbs.thumbsUp.length, ' ', thumbs.thumbsDown.length)

    console.log('liked by: ', thumbs.thumbsUp)

  const handleThumbsUpClick = () => {
    if (isLoggedIn && Object.keys(user).length != 0) {
        //console.log('thumbs up')
        console.log('liked by: ', thumbs.thumbsUp)
        //console.log('disliked by: ', thumbs.thumbsDown)


        if (!thumbs.thumbsUp.includes(user._id)) {
          // Lisää tykkäys
          console.log('like added')
          // Vaihda kuvakkeen väri
          document.getElementById(upId).classList.add('clicked')

          // Jos dislike, poista se
          if (thumbs.thumbsDown.includes(user._id)) {
            // Poista dislike ja lisää tykkäys
          } else {
            // Lisää käyttäjä tykkäyksiin
            const newThumbs = {
              ...thumbs,
              thumbsUp: thumbs.thumbsUp.concat(user._id)
            }

            // Päivitys tietokantaan
            restaurantService
              .update(restaurant.id, newThumbs)
              .then(response => {
                  console.log('toimi ',response)
              })
              .catch(error => {
                console.log(error)
              })

            // Päivitys sivulle
            setThumbs(newThumbs)
          }
        } else {
          // Poista tykkäys

          console.log('like removed')
          // Poista vihreä väri
          document.getElementById(upId).classList.remove('clicked')

          // Poista käyttäjän id tykkäyksistä
          const newThumbs = {
            ...thumbs,
            thumbsUp: thumbs.thumbsUp.filter(id => id != user._id)
          }
          setThumbs(newThumbs)
        }
    } else {
        console.log('log in')
        // alert
    }
  }

  const handleThumbsDownClick = () => {
      if (isLoggedIn && Object.keys(user).length != 0) {
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
        <ThumbsUpButtons upId={upId} downId={downId} up={thumbs.thumbsUp.length} down={thumbs.thumbsDown.length} handleUp={handleThumbsUpClick} handleDown={handleThumbsDownClick} />
      </article>
    )
  }

export default Restaurant