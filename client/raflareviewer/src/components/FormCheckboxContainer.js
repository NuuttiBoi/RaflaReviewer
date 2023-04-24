import Checkbox from './FormCheckbox'

const FormCheckboxContainer = ({ labels }) => {
    const checkboxes = labels.map(label => {
        return <Checkbox label={label} />
    });

    return (
      <div>{checkboxes}</div>
    );
  };
  export default FormCheckboxContainer