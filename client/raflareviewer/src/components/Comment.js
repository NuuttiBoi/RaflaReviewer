import Delete from '../images/Trash'
import Flag from '../images/Flag'
import Confirm from './Confirm'

const Comment = ({ userId, id, content, date }) => {  

    // Kommentin poistaminen
    function confirmDelete() {
        console.log('delete? ', id)
        document.getElementById('confirmDeleteComment').classList.remove('visuallyhidden')
        document.querySelector('body').classList.add('locked')
    }

    function reportComment() {
        console.log('report ', id)
    }

    function deleteComment() {
        console.log('id??? ', id)
        console.log('deleting ', id, ' ', content)
    }
    
    return (
        <div className="commentItem">
            <p>id {id}</p>
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
            <Confirm onClick={deleteComment}/>
        </div>
    )
}

export default Comment