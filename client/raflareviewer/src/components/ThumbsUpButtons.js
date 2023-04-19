import Icon from '../images/thumbsUp.js'

const ThumbsUpButtons = () => {
    return (
        <div className="thumbsUpButtons">
            <button className="thumbsUp"><Icon /><p>0</p></button><button className="thumbsDown"><Icon /><p>0</p></button>
        </div>
    )
}

export default ThumbsUpButtons