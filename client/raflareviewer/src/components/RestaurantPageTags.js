import Tag from './Tag'

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