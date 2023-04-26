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

const RestaurantPage = (props) => {
    let location = useLocation();
    const { state } = location;

    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])

    console.log('scoreinfo? ', state.scoreInfo)

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


    console.log('comments: ', comments)

    function saveComment() {
        console.log(state.restaurant)

        // Kommentti-olio
        const Comment = {
            restaurantId: state.restaurant.id,
            userId: "Anonyymi", // käyttäjä
            content: newComment
        }
        console.log('saving ', Comment)

        // Kommentin tallennus palvelimelle
        commentService.create(Comment)
            .then(response => {
                console.log('comment saved ', response)
                document.getElementById('commentField').value = ''
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
                    <ThumbsUpButtons />
                </div>
            </section>
            <section>
                <Scores scores={state.scoreInfo} />
            </section>
            <section>
                <h2>Kartalla</h2>
            </section>
            <section>
                <h2>Arvostelut</h2>
                <div className="commentForm">
                    <label className="username">käyttäjä</label>
                    <textarea id="commentField" onChange={handleCommentChange} className="formInput" rows="5"/>
                    <button className="button submitButton unclickable" onClick={saveComment}>Lähetä</button>
                </div>
                <Comments comments={comments} />
            </section>
            <Confirm />
        </div>
    )
}

export default RestaurantPage