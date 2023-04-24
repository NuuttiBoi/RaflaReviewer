import Delete from '../images/Trash'
import Flag from '../images/Flag'
import Confirm from './Confirm'

const Comment = ({ userId, id, content, date }) => {  

    // Avaa popupin, jossa kysytään haluaako varmasti poistaa kommentin
    const confirmDelete = () => {
        console.log(id)
        document.getElementById(id).classList.remove('visuallyhidden')
        document.querySelector('body').classList.add('locked')
    }

    // Poistaa kommentin
    function deleteComment() {
        console.log('poistetaan ', id)
        //sulje popup
    }

    function reportComment() {
        console.log('report ', id)
    }

    // Sulkee popupin
    function closePopup() {
        document.getElementById('confirmDeleteComment').classList.add('visuallyhidden')
        document.querySelector('body').classList.remove('locked')
    }
    
    return (
        <div className="commentItem">
            <p className="comment__content">{content}</p>
            <div className="comment__info">
                <p className="username">{userId}</p>
                <p className="comment__date">{date}</p>
            </div>
            <div className="comment__buttons">
                <button onClick={reportComment} className="commentButton" title="Ilmoita asiaton kommentti">
                    <Flag />
                </button>
                <button onClick={confirmDelete} className="commentButton" title="Poista">
                    <Delete />
                </button>
            </div>
            <Confirm id={id} onClick={deleteComment} />
        </div>
    )
}

export default Comment