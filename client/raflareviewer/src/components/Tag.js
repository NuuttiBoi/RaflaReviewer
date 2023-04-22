const Tag = ({ label }) => {
    const isChecked=false
    const click= () => {
        console.log(label)
        document.getElementById(label).classList.toggle('checked');
    }

    return (
        <div id={label} className='tag'>
        <label>
          <input type="checkbox" checked={isChecked} onChange={click}/>
          <span className="tagLabel">{label}</span>
        </label>
      </div>
    )
}

export default Tag