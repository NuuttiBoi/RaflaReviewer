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
    const [image, setImage] = useState('')
    const defaultImage = 'https://users.metropolia.fi/~matleek/notfound.jpg'

    // Tykänneiden käyttäjien id:t taulukoissa
    const [thumbs, setThumbs] = useState({
      thumbsUp: [],
      thumbsDown: []
    })
  
    const user = useData() || {}
    console.log('isLoggedIn: ', isLoggedIn)
    console.log('user: ', user)

    /**
     * Hakee tietokannasta kommentit ravintolan id:llä
     */
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

    /**
     * Tykkäysten alustus
     */
    useEffect(() => {
      setThumbs({
        thumbsUp: restaurant.thumbsUp,
        thumbsDown: restaurant.thumbsDown
      })
    }, [])

    useEffect(() => {
      /**
      * Tarkistus löytyykö url-osoitteella kuva
      * @url {string} - tarkistettava url
      */
       function imageFound (url) {
         var image = new Image();
         image.onload = function() {
           if (this.width > 0) {
             console.log(restaurant.name, " image exists");
             setImage(url)
           }
         }
         image.onerror = function() {
           console.log(restaurant.name, "image doesn't exist");
           setImage(defaultImage)
         }
         image.src = url
       }
       imageFound(restaurant.image)
     })
 

    // Jokaisen ravintolan peukkukuvakkeilla yksilölliset id:t
    const upId = `thumbsUp${restaurant.id}`
    const downId = `thumbsDown${restaurant.id}`

    const likeBtn = document.getElementById(upId)
    const dislikeBtn = document.getElementById(downId)

    // Jos sisäänkirjautunut käyttäjä on antanut arvostelulle ylä/alapeukun, vaihda kuvakkeen väri
    if (thumbs.thumbsUp.includes(user._id)) likeBtn.classList.add('clicked')
    if (thumbs.thumbsDown.includes(user._id)) dislikeBtn.classList.add('clicked')
    
    /**
     * Käsittelee yläpeukkukuvakkeen klikkauksen
     */
    const handleThumbsUpClick = () => {
      if (isLoggedIn && Object.keys(user).length != 0) {
          // Jos käyttäjä on kirjautunut sisään

          let newThumbs // Päivitetyt tykkäykset sisältävä olio

          // Jos käyttäjä ei ole vielä antanut yläpeukkua
          if (!thumbs.thumbsUp.includes(user._id)) {

            // Vaihda yläpeukun väri
            likeBtn.classList.add('clicked')

            if (thumbs.thumbsDown.includes(user._id)) {
              // Jos käyttäjä on antanut alapeukun aiemmin, poista alapeukku ja lisää yläpeukku

              // Poista alapeukun väri
              dislikeBtn.classList.remove('clicked')

              newThumbs = {
                thumbsDown: thumbs.thumbsDown.filter(id => id != user._id),
                thumbsUp: thumbs.thumbsUp.concat(user._id)
              }
            } else {
              // Jos ei ole antanut alapeukkua, lisää pelkästään käyttäjä yläpeukkuihin
              newThumbs = {
                ...thumbs,
                thumbsUp: thumbs.thumbsUp.concat(user._id)
              }
            }
          } else {
            // Jos nappia painetaan, kun käyttäjä on jo antanut yläpeukun, poista yläpeukku

            // Poista yläpeukun väri
            likeBtn.classList.remove('clicked')

            // Poista käyttäjän id yläpeukuista
            newThumbs = {
              ...thumbs,
              thumbsUp: thumbs.thumbsUp.filter(id => id != user._id)
            }
          }
          // Päivitys tietokantaan
          restaurantService
          .updateRestaurant(restaurant.id, newThumbs)
          .then(response => {
              console.log('thumbs up toimi ',response)
          })
          .catch(error => {
            console.log(error)
          })

          // Päivitys sivulle
          setThumbs(newThumbs)
      } else {
          // Jos ei kirjautunut sisään, näytä popup
          document.getElementById('loginPrompt').classList.remove('visuallyhidden')
          document.querySelector('body').classList.add('locked')
        }
    }

    /**
     * Käsittelee alapeukkukuvakkeen klikkauksen
     */
    const handleThumbsDownClick = () => {
      if (isLoggedIn && Object.keys(user).length != 0) {
          // Jos käyttäjä on kirjautunut sisään

          let newThumbs // Päivitetyt tykkäykset sisältävä olio

          // Jos käyttäjä ei ole vielä antanut alapeukkua
          if (!thumbs.thumbsDown.includes(user._id)) {

            // Vaihda alapeukun väri
            dislikeBtn.classList.add('clicked')

            if (thumbs.thumbsUp.includes(user._id)) {
              // Jos käyttäjä on antanut yläpeukun aiemmin, poista yläpeukku ja lisää alapeukku

              // Poista yläpeukun väri
              likeBtn.classList.remove('clicked')

              newThumbs = {
                thumbsUp: thumbs.thumbsUp.filter(id => id != user._id),
                thumbsDown: thumbs.thumbsDown.concat(user._id)
              }
            } else {
              // Jos ei ole antanut yläpeukkua, lisää pelkästään käyttäjä alapeukkuihin
              newThumbs = {
                ...thumbs,
                thumbsDown: thumbs.thumbsDown.concat(user._id)
              }
            }
          } else {
            // Jos nappia painetaan, kun käyttäjä on jo antanut alapeukun, poista alapeukku

            // Poista alapeukun väri
            dislikeBtn.classList.remove('clicked')

            // Poista käyttäjän id alapeukuista
            newThumbs = {
              ...thumbs,
              thumbsDown: thumbs.thumbsDown.filter(id => id != user._id)
            }
          }
          // Päivitys tietokantaan
          restaurantService
          .updateRestaurant(restaurant.id, newThumbs)
          .then(response => {
              console.log('thumbs down toimi ',response)
          })
          .catch(error => {
            console.log(error)
          })

          // Päivitys sivulle
          setThumbs(newThumbs)
      } else {
          // Jos ei kirjautunut sisään, näytä popup
          document.getElementById('loginPrompt').classList.remove('visuallyhidden')
          document.querySelector('body').classList.add('locked')
        }
    }

    /**
     * Ruoalle, hinta-laatusuhteelle ja kokemukselle annetut
     * arvosanat sekä maksimiarvot ja otsikot tallennettuna listaan.
     * Lista välitetään komponentille, joka generoi arvosanaboksin
     */
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
          <img src={image} />
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
            <span>Katso kommentit</span> <span>{`(${comments.length})`}</span>
        </NavLink>
        <ThumbsUpButtons upId={upId} downId={downId} up={thumbs.thumbsUp.length} down={thumbs.thumbsDown.length} handleUp={handleThumbsUpClick} handleDown={handleThumbsDownClick} />
      </article>
    )
  }

export default Restaurant