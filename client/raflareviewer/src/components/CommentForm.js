const CommentForm = () => {
    return (
        <div>
            <form className="commentForm">
                <label className="username">käyttäjä</label>
                <textarea className="formInput" rows="5"/>
                <button className="button">Lähetä</button>
            </form>
        </div>
    )
}


export default CommentForm