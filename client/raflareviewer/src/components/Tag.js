/**
 * Komponentti, joka renderöi yksittäisen Tag-komponentin.
 * @param label  - tageihin liittyvä teksti.
 * @param onChange - funktio, joka kutsutaan kun tageja valitaan tai poistetaan
 * @returns {JSX.Element}
 * @constructor
 */
const Tag = ({ label, onChange }) => {
    let isChecked=false

    return (
        <div id={label} className='tag'>
        <label>
          <input type="checkbox" checked={isChecked} onChange={onChange}/>
          <span className="tagLabel">{label}</span>
        </label>
      </div>
    )
}

export default Tag