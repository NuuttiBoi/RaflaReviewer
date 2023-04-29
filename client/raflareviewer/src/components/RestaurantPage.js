import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Back from '../images/Back'
import Address from './Address'
import ThumbsUpButtons from './ThumbsUpButtons'
import { NavLink } from 'react-router-dom'
import commentService from '../services/comments'
import Comments from './Comments'
import Confirm from './Confirm'
import RestaurantPageTags from './RestaurantPageTags'
import Scores from './Scores'
import MapBoxMap from './Map/MapBoxMap';
import useData from "../hooks/useData";

const RestaurantPage = ({isLoggedIn}) => {
    let location = useLocation();
    const { state } = location;

    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])
    const [thumbsUp, setThumbsUp] = useState([])
    const [thumbsDown, setThumbsDown] = useState([])

    const user = useData() || {}

    let username = "Anonyymi"
    if (isLoggedIn) {
        username = user.username
    }

    // Kommenttien asetus
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

    // Thumbs up/down asetus
    /* useEffect(() => {
        setThumbsUp(state.restaurant.thumbsUp)
        setThumbsDown(state.restaurant.thumbsDown)
    }, []) */

    function saveComment() {

        // Kommentti-olio
        const Comment = {
            restaurantId: state.restaurant.id,
            userId: username, // käyttäjä
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

    const updatePage = (deletedComment) => {
        console.log('update page w/o: ', deletedComment)
        //setRestaurants(restaurants.concat(newRestaurant))
        setComments(comments.filter(comment => comment.id !== deletedComment))
    }

    /* const handleThumbsUpClick = () => {
        if (isLoggedIn) {
            console.log('thumbs up')
            console.log('gave thumbs up:', state.restaurant.thumbsUp)
            if (!state.restaurant.thumbsUp.includes(user.id)) {

            }
        } else {
            console.log('log in')
        }
    }

    const handleThumbsDownClick = () => {
        if (isLoggedIn) {
            console.log('thumbs down')
            console.log('gave thumbs down:', state.restaurant.thumbsDown)
        } else {
            console.log('log in')
        }
    } */

    return (
        <div className="container">
            <section>
                <NavLink to="/" className="back-icon"><Back /></NavLink>
                <h1>{state.restaurant.name}</h1>
            </section>
            <section>
                <RestaurantPageTags tags={state.restaurant.tags} />
                <Address address={state.restaurant.address} />
                <div className="hide-border">
                </div>
            </section>
            <section>
                <Scores scores={state.scoreInfo} />
            </section>
            <section id="comments">
                <h2>Arvostelut</h2>
                <div className="commentForm">
                    <label className="username">{username}</label>
                    <textarea id="commentField" onChange={handleCommentChange} className="formInput" rows="5"/>
                    <button className="button submitButton unclickable" onClick={saveComment}>Lähetä</button>
                </div>
                <Comments comments={comments} update={updatePage} />
            </section>
            <section>
              <h2>Kartalla</h2>
              <div>
                <MapBoxMap></MapBoxMap>
                <Address address={state.restaurant.address} />
              </div>
            </section>
            <Confirm />
        </div>
    )
}

export default RestaurantPage