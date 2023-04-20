import { useLocation } from 'react-router-dom'
import Back from '../images/Back'
import Address from './Address'
import ThumbsUpButtons from './ThumbsUpButtons'
import { NavLink } from 'react-router-dom'


const RestaurantPage = (props) => {
    let location = useLocation();
    const { state } = location;
    console.log("props ", state.restaurant)
    const restaurant = state.restaurant

    return (
        <div className="container">
            <NavLink to="/" className="back-icon"><Back /></NavLink>
            <h1>{restaurant.name}</h1>
            <section>
                <Address address={restaurant.address} />
                <div className="hide-border">
                    <ThumbsUpButtons />
                </div>
            </section>
            <section>
                <h2>Kartalla</h2>
            </section>
            <section>
                <h2>Arvostelut</h2>
            </section>
        </div>
    )
}

export default RestaurantPage