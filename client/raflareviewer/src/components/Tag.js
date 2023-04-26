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