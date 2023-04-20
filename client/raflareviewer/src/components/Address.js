import Pin from '../images/Pin'

const Address = ({ address }) => {
    return (
        <div className="address-box">
          <Pin />
          <p>{address}</p>
        </div>
    )
}

export default Address