import Tag from './Tag'

const Tags = ({ cafeLabel, onCafeChange, fastFoodLabel, onFastFoodChange,
    lunchLabel, onLunchChange, brunchLabel, onBrunchChange,
    vegetarianLabel, onVegetarianChange, accessibleLabel, onAccessibleChange,
    takeAwayLabel, onTakeAwayChange }) => {    

    return (
        <div id="tagContainer" className="tagContainer visuallyhidden">
          <Tag label={cafeLabel} onChange={onCafeChange} />
          <Tag label={fastFoodLabel} onChange={onFastFoodChange} />
          <Tag label={lunchLabel} onChange={onLunchChange} />
          <Tag label={brunchLabel} onChange={onBrunchChange} />
          <Tag label={vegetarianLabel} onChange={onVegetarianChange} />
          <Tag label={accessibleLabel} onChange={onAccessibleChange} />
          <Tag label={takeAwayLabel} onChange={onTakeAwayChange} />
        </div>
    )
}

export default Tags