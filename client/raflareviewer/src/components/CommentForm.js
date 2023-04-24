import { useState } from 'react'

const CommentForm = ({ onSubmit }) => {
    return (
        <div>
            <form className="commentForm" onSubmit={onSubmit}>
                <label className="username">käyttäjä</label>
                <textarea className="formInput" rows="5"/>
                <button className="button">Lähetä</button>
            </form>
        </div>
    )
}

export default CommentForm

// voi poistaa?