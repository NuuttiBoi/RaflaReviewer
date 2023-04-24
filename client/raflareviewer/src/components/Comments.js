import Comment from './Comment'

const Comments = ({ comments }) => {
    const commentList = comments.map(comment => {
        return (
            <Comment key={comment.id} id={comment.id} userId={comment.userId} content={comment.content} date={comment.date} />
        )
    })
    return (
        <div className="commentsContainer">{commentList}</div>
    )
}


export default Comments