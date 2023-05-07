import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Back from '../images/Back'
import Address from './Address'
import ThumbsUpButtons from './ThumbsUpButtons'
import { NavLink } from 'react-router-dom'
import restaurantService from '../services/restaurants'
import commentService from '../services/comments'
import Comments from './Comments'
import Confirm from './Confirm'
import RestaurantPageTags from './RestaurantPageTags'
import Scores from './Scores'
import MapBoxMap from './Map/MapBoxMap';
import useData from "../hooks/useData";
import userService from '../services/users'
import ConfirmDeleteReview from './ConfirmDeleteReview'
import Report from './Report'

const RestaurantPage = ({isLoggedIn}) => {
    let location = useLocation();
    const { state } = location;
    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])
    const [reviewedBy, setReviewedBy] = useState(null)
    const [restaurant, setRestaurant] = useState(null)
    const [image, setImage] = useState('')

    // Oletuskuva, joka näytetään, jos arvosteluun ei ole tallennettu kuvaa tai sitä ei löydy
    const defaultImage = 'https://users.metropolia.fi/~matleek/notfound.jpg'

    /**
     * Ylä/alapeukun antaneiden käyttäjien id:t taulukossa
     */
    const [thumbs, setThumbs] = useState({
        thumbsUp: [],
        thumbsDown: []
    })

    const user = useData() || {}

    // Käyttäjänimi, joka tulee kommenttikenttään
    let username = "Vierailija"
    if (isLoggedIn) {
        username = user.username
    }

    // Onko arvostelun lähettänyt käyttäjä sisäänkirjautunut
    const authorLoggedIn = (isLoggedIn && user._id === state.restaurant.userId)
    console.log('author logged in ', authorLoggedIn)

    /**
     * Ravintolan haku tietokannasta ja peukkujen alustus
     */
    useEffect(() => {
        restaurantService
            .getRestaurant(state.restaurant.id)
            .then(response => {
                setRestaurant(response)

                setThumbs({
                    thumbsUp: response.thumbsUp,
                    thumbsDown: response.thumbsDown
                  })
            })
            .catch(error => {
            console.log(error)
            })
    }, [])

    /**
     * Arvostelun tehneen käyttäjän haku tietokannasta
     */
    useEffect(() => {
    userService
        .getUser(state.restaurant.userId)
        .then(response => {
            setReviewedBy(response.username)
        })
        .catch(error => {
        console.log(error)
        })
    }, [])

    /**
     * Kommenttien haku tietokannasta ravintolan id:llä
     */
    useEffect(() => {
        commentService
          .getByRestaurant(state.restaurant.id)
          .then(response => {
              console.log(response)
              setComments(response)
          })
          .catch(error => {
            console.log(error)
          })
    }, [])

    useEffect(() => {
      /**
      * Tarkistus löytyykö url-osoitteella kuva
      * @url {string} url - tarkistettava url
      */
       function imageFound (url) {
         var image = new Image();
         image.onload = function() {
           if (this.width > 0) {
             setImage(url)
           }
         }
         image.onerror = function() {
           setImage(defaultImage)
         }
         image.src = url
       }
       imageFound(state.restaurant.image)
     })
 
    const likeBtn = document.getElementById(state.upId)
    const dislikeBtn = document.getElementById(state.downId)

    // Jos sisäänkirjautunut käyttäjä on antanut arvostelulle ylä/alapeukun, vaihda kuvakkeen väri
    if (thumbs.thumbsUp.includes(user._id)) likeBtn.classList.add('clicked')
    if (thumbs.thumbsDown.includes(user._id)) dislikeBtn.classList.add('clicked')
    
    // Poista-nappi näkyvissä vain arvostelun tekijälle
    if (authorLoggedIn) {
       document.getElementById('deleteReviewBtn').classList.remove('visuallyhidden')
    }

    /**
     * Kommentin tallennus
     */
    function saveComment() {
        // Kommentti-olio
        const Comment = {
            restaurantId: state.restaurant.id,
            username: username, // käyttäjä
            userId: user._id,
            content: newComment
        }
        console.log('saving ', Comment)

        // Kommentin tallennus palvelimelle
        commentService.create(Comment)
            .then(response => {
                console.log('comment saved ', response)
                document.getElementById('commentField').value = '' // Kentän tyhjennys
                setComments(comments.concat(response)) // Päivitys sivulle
            })
            .catch(error => {
                console.log('comment error ', error)
            })
    }

    /**
     * Kommentin päivitys kommenttikentän muuttuessa
     */
    const handleCommentChange = (event) => {
        console.log(event.target.value)
        setNewComment(event.target.value)

        // Estää tyhjän kentän lähettämisen
        if (event.target.value.length === 0) {
            document.querySelector('.submitButton').classList.add('unclickable')
        } else {
            document.querySelector('.submitButton').classList.remove('unclickable')
        }
    }

    /**
     * Funktiota kutsutaan, kun kommentti poistetaan.
     * Renderöi kommentit sivulle uudestaan ilman poistettua kommenttia
     */
    const updatePage = (deletedComment) => {
        console.log('päivitä sivu ilman: ', deletedComment)
        //setRestaurants(restaurants.concat(newRestaurant))
        setComments(comments.filter(comment => comment.id !== deletedComment))
    }

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
            .updateRestaurant(state.restaurant.id, newThumbs)
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
          .updateRestaurant(state.restaurant.id, newThumbs)
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
     * Poista-painiketta painaessa avautuu popup, jossa kysytään, haluaako käyttäjä varmasti poistaa ravintolan
     */
    const deleteRestaurant = () => {
      console.log('poista')
      document.getElementById('confirmDeletePopup').classList.remove('visuallyhidden')
      document.querySelector('body').classList.add('locked')
    }
    
    /**
     * Ravintolan poisto
     */
    const confirmDelete = () => {
        // Kommenttien poisto tietokannasta
        commentService
        .deleteByRestaurant(state.restaurant.id)
        .then(response => {
            console.log('deleted comments ', response)
        })
        .catch(error => {
          console.log(error)
        })
        console.log('kommentit poistettiin')

        // Ravintolan poisto tietokannasta
        restaurantService
              .deleteRestaurant(state.restaurant.id)
              .then(response => {
                  console.log('deleted res ', response)
              })
              .catch(error => {
                console.log(error)
              })
        closePopup()
    }

    /**
     * Sulkee popupin
     */
    function closePopup() {
        document.getElementById('confirmDeletePopup').classList.add('visuallyhidden')
        document.querySelector('body').classList.remove('locked')
    }
    
    const sendReport = () => {
      console.log('ilmoita virheellinen id')
    }

    return (
        <div className="container">
            <NavLink to="/" className="back-icon"><Back /></NavLink>
            <section>
                <h1>{state.restaurant.name}</h1>
                <RestaurantPageTags tags={state.restaurant.tags} />
                <p className='small italic'>Arvostelun lähettänyt <span className='username'>{reviewedBy}</span></p>
            </section>

            <section className='image-scores'>
              <figure className="reviewImage">
                <img src={image} />
              </figure>
              <div className='scores-likes'>
                <div className="full-width-mobile">
                  <Scores scores={state.scoreInfo} />
                </div>
                <div className="hide-border center-mobile right-bigscreen">
                    <ThumbsUpButtons upId={state.upId} downId={state.downId} up={thumbs.thumbsUp.length} down={thumbs.thumbsDown.length} handleUp={handleThumbsUpClick} handleDown={handleThumbsDownClick} />
                </div>
              </div>
            </section>
            <section>
              <h2>Kartalla</h2>
              <div>
                <MapBoxMap></MapBoxMap>
                <Address address={state.restaurant.address} />
              </div>
            </section>
            <section>
                <button id="deleteReviewBtn" className="button deleteBtn visuallyhidden center right-bigscreen" onClick={deleteRestaurant}>Poista arvostelu</button>
            </section>
            <section id="comments">
                <h2>Kommentit</h2>
                <div className="commentForm">
                    <label className="username">{username}</label>
                    <textarea id="commentField" onChange={handleCommentChange} className="formInput" rows="5"/>
                    <button className="button submitButton unclickable" onClick={saveComment}>Lähetä</button>
                </div>
                <Comments comments={comments} update={updatePage} isLoggedIn={isLoggedIn}/>
            </section>
            <section>
              <Report onClick={sendReport} />
            </section>
            <Confirm />
            <ConfirmDeleteReview onClick={confirmDelete} />
        </div>
    )
}

export default RestaurantPage