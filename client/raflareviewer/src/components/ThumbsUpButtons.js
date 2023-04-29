import Icon from '../images/thumbsUp.js'

const ThumbsUpButtons = ({ upId, downId, up, down, handleUp, handleDown }) => {
    return (
        <div className="thumbsUpButtons">
            <button className="thumbsUp" id={upId} onClick={handleUp}><Icon /><p>{up}</p></button><button className="thumbsDown" id={downId} onClick={ handleDown }><Icon /><p>{down}</p></button>
        </div>
    )
}

export default ThumbsUpButtons