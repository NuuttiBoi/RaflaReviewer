import Pin from '../images/Pin'

/**
 * Elementti, jossa nuppineulakuvake ja osoite
 */

const Address = ({ address }) => {
    return (
        <div className="address-box">
          <Pin />
          <p>{address}</p>
        </div>
    )
}

export default Address