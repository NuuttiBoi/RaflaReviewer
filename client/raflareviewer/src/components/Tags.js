import Tag from './Tag'

/**
 * Komponentti, jolla renderöidään tagit.
 * @param cafeLabel - Kahvila-tagin teksti.
 * @param onCafeChange - Kahvila-tagin tilan muutoksen käsittelijä.
 * @param fastFoodLabel - Pikaruoka-tagin teksti.
 * @param onFastFoodChange - Pikaruoka-tagin tilan muutoksen käsittelijä.
 * @param lunchLabel - Lounas-tagin teksti.
 * @param onLunchChange - Lounas-tagin tilan muutoksen käsittelijä.
 * @param brunchLabel - Brunssi-tagin teksti.
 * @param onBrunchChange - Brunssi-tagin tilan muutoksen käsittelijä.
 * @param vegetarianLabel - Kasvisruoka-tagin teksti.
 * @param onVegetarianChange - Kasvisruoka-tagin tilan muutoksen käsittelijä.
 * @param accessibleLabel - Esteettömyys-tagin teksti.
 * @param onAccessibleChange - Esteettömyys-tagin tilan muutoksen käsittelijä.
 * @param takeAwayLabel - Takeaway-tagin teksti.
 * @param onTakeAwayChange - Takeaway-tagin tilan muutoksen käsittelijä.
 * @returns {JSX.Element}
 * @constructor
 */
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