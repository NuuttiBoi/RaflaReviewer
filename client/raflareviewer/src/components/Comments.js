import Comment from './Comment'

const Comments = ({ comments, update, isLoggedIn }) => {
    const commentList = comments.map(comment => {
        return (
            <Comment key={comment.id} id={comment.id} userId={comment.userId} username={comment.username} content={comment.content} date={comment.date} update={update} isLoggedIn={isLoggedIn} />
        )
    })
    
    if (comments.length === 0) {
        return <p className="no-results">Ei vielä kommentteja</p>
    }

    return (
        <div className="commentsContainer">{commentList}</div>
    )
}


export default Comments