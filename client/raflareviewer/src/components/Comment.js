import Delete from '../images/Trash'
import Flag from '../images/Flag'

const Comment = ({ userId, id, content, date }) => {  

    // Kommentin poistaminen
    function deleteComment() {
        console.log('delete? ', id)
    }

    function reportComment() {
        console.log('report ', id)
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
                    <button onClick={deleteComment} className="commentButton" title="Poista">
                        <Delete />
                    </button>
                </div>

            
        </div>
    )
}


export default Comment