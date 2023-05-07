import Tag from './Tag'

/**
 * Komponentti, joka renderöi ravintolasivun tagit.
 * @param tags - tagit, jotka halutaan renderöidä.
 * @returns {JSX.Element}
 * @constructor
 */
const RestaurantPageTags = ({ tags }) => {
    const tagItems = tags.map(tag => {
        return (
            <Tag label={tag} />
        )
    })

    return (
        <div className="tagContainer unclickableTags">
            {tagItems}
        </div>
    )
}

export default RestaurantPageTags