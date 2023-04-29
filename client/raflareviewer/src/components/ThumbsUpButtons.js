import Icon from '../images/thumbsUp.js'

const ThumbsUpButtons = ({ up, down, handleUp, handleDown }) => {
    return (
        <div className="thumbsUpButtons">
            <button className="thumbsUp" onClick={handleUp}><Icon /><p>{up}</p></button><button className="thumbsDown" onClick={ handleDown }><Icon /><p>{down}</p></button>
        </div>
    )
}

export default ThumbsUpButtons