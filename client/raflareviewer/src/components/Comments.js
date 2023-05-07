import Comment from './Comment'

/**
 * Kommentit sisältävä osio
 */

const Comments = ({ comments, update, isLoggedIn }) => {

    /**
     * Luo saamastaan listasta kommentti-elementtejä
     */
    const commentList = comments.map(comment => {
        return (
            <Comment key={comment.id} id={comment.id} userId={comment.userId} username={comment.username} content={comment.content} update={update} isLoggedIn={isLoggedIn} />
        )
    })
    
    /**
     * Jos ei kommentteja, palauttaa sivulle tekstin
     */
    if (comments.length === 0) {
        return <p className="no-results">Ei vielä kommentteja</p>
    }

    return (
        <div className="commentsContainer">{commentList}</div>
    )
}

export default Comments