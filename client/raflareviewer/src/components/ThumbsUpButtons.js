import Icon from '../images/thumbsUp.js'

/**
 * Komponentti, joka näyttää peukku napit.
 * @param upId - Peukku ylös ID.
 * @param downId - Peukku alas ID
 * @param up - Peukku ylös määrä.
 * @param down - Peukku alas määrä.
 * @param handleUp - Hoitaa peukun ylös painamisen eventin.
 * @param handleDown - Hoita peukun alas painamisen eventin.
 * @returns {JSX.Element}
 * @constructor
 */
const ThumbsUpButtons = ({ upId, downId, up, down, handleUp, handleDown }) => {
    return (
        <div className="thumbsUpButtons">
            <button className="thumbsUp" id={upId} onClick={handleUp}><Icon /><p>{up}</p></button><button className="thumbsDown" id={downId} onClick={ handleDown }><Icon /><p>{down}</p></button>
        </div>
    )
}

export default ThumbsUpButtons