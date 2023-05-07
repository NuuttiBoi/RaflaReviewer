/**
 * "Lisää uusi arvostelu" -lomakkeen checkbox
 */

const FormCheckbox = ({ label, onChange, isChecked }) => {
    return (
      <div className='checkbox'>
        <label>
          <input type="checkbox" checked={isChecked} onChange={onChange} />
          <span>{label}</span>
        </label>
      </div>
    );
  };

  export default FormCheckbox