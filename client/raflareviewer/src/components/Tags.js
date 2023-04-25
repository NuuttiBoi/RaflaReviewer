import Tag from './Tag'
import tagList from '../sources/tagList'

const Tags = () => {    
    const tags = Object.values(tagList).map(tag => {
        return <Tag key={tag} label={tag} />
    })

    return (
        <div id="tagContainer" className="tagContainer visuallyhidden">
          {tags}
        </div>
    )
}

export default Tags