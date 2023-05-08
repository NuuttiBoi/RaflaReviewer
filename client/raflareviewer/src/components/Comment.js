import Delete from '../images/Trash'
import Flag from '../images/Flag'
import Confirm from './Confirm'
import commentService from '../services/comments'
import useData from '../hooks/useData'

const Comment = ({ userId, username, id, content, update, isLoggedIn }) => {  
    const user = useData() || {}

    // Onko kommentin jättänyt käyttäjä kirjautuneena sisään
    const authorLoggedIn = (isLoggedIn && user._id === userId)
    console.log('author logged in? (comment) ', authorLoggedIn)

    /**
     * Avaa popupin, jossa kysytään, haluaako käyttäjä varmasti poistaa kommentin
     */
    const confirmDelete = () => {
        console.log(id)
        document.getElementById(id).classList.remove('visuallyhidden')
        document.querySelector('body').classList.add('locked')
    }

    /**
     * Kommentin poisto tietokannasta
     */
    function deleteComment() {
        console.log('poistetaan ', id)

        commentService
              .deleteComment(id)
              .then(response => {
                  console.log('deleted comment ', response)
                  
                  /* Kutsuu RestaurantPage-komponentista funktiota joka päivittää
                  sivun, ja välittää sille poistetun id:n */
                  update(id)
              })
              .catch(error => {
                console.log(error)
              })
        closePopup()
    }

    /**
     * Ei oikeasti tee mitään, vaan pieni ylimääräinen juttu rekvisiitaksi
     */
    const reportComment = () => {
        console.log('report ', id)
        document.getElementById("reportReceived").classList.remove('visuallyhidden')
        document.querySelector('body').classList.add('locked')
    }

    /**
     * Sulkee popupin
     */
    function closePopup() {
        document.getElementById(id).classList.add('visuallyhidden')
        document.querySelector('body').classList.remove('locked')
    }
    
    return (
        <div className="commentItem">
            <p className="comment__content">{content}</p>
            <div className="comment__info">
                <p className="username">{username}</p>
                { authorLoggedIn ? <button onClick={confirmDelete} className="commentButton" title="Poista"><Delete /></button> :                 <button onClick={reportComment} className="commentButton" title="Ilmoita asiaton kommentti"><Flag /></button>}
            </div>
            <Confirm id={id} onClick={deleteComment} />
        </div>
    )
}

export default Comment