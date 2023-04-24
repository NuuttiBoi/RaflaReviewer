const Comment = ({ userId, content, date }) => {    
    return (
        <div className="commentItem">
            <p className="comment__content">{content}</p>
            <div className="comment__info">
            <p className="username">{userId}</p>
            <p className="comment__date">{date}</p>
            </div>
        </div>
    )
}


export default Comment